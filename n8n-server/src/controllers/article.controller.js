import OpenAI from "openai";
import slugify from "slugify";

import { calculatePrice } from "../utils/calculatePrice.js";
import { uploadImage, uploadFile } from "../utils/uploadToCloudinary.js";
import * as service from "../service/article.service.js";
import { ARTICLE_MESSAGES } from "../configs/messages.js";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// ================= CREATE =================
export const create = async (req, res) => {
  try {
    const data = req.validatedBody;

    // ================= CLEAN DESCRIPTION =================
    if (data.description) {
      data.description = data.description
        .replace(/<[^>]*>?/gm, "")
        .replace(/&nbsp;/g, " ")
        .trim();
    }

    // ================= FILE / URL =================

    // image
    if (req.files?.image?.[0]) {
      data.image = await uploadImage(req.files.image[0]);
    } else if (!data.image) {
      return res.status(400).json({
        message: ARTICLE_MESSAGES.IMAGE_REQUIRED,
      });
    }

    // workflow
    if (req.files?.workflow?.[0]) {
      data.workflow = await uploadFile(req.files.workflow[0]);
    }

    // ================= SLUG =================

    let baseSlug = data.slug
      ? slugify(data.slug, {
          lower: true,
          strict: true,
        })
      : slugify(data.title, {
          lower: true,
          strict: true,
        });

    let slug = baseSlug;
    let count = 1;

    while (await service.isSlugTaken(slug)) {
      slug = `${baseSlug}-${count++}`;
    }

    data.slug = slug;

    // ================= PRICE =================

    const priceData = calculatePrice(data.price, data.discount);

    // ================= CREATE =================

    const article = await service.createArticle(
      {
        ...data,
        ...priceData,
      },
      req.user._id || req.user.id,
    );

    return res.status(201).json(article);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// ================= UPDATE =================
export const update = async (req, res) => {
  try {
    const data = req.validatedBody;

    // ================= FILE =================

    if (req.files?.image?.[0]) {
      data.image = await uploadImage(req.files.image[0]);
    }

    if (req.files?.workflow?.[0]) {
      data.workflow = await uploadFile(req.files.workflow[0]);
    }

    // ================= PRICE =================

    if (data.price !== undefined || data.discount !== undefined) {
      const current = await service.getArticleById(req.params.id);

      if (!current) {
        return res.status(404).json({
          message: ARTICLE_MESSAGES.ARTICLE_NOT_FOUND,
        });
      }

      const priceData = calculatePrice(
        data.price ?? current.price,
        data.discount ?? current.discount,
      );

      Object.assign(data, priceData);
    }

    // ================= UPDATE =================

    const updated = await service.updateArticle(
      req.params.id,
      data,
      req.user._id,
    );

    if (!updated) {
      return res.status(404).json({
        message: ARTICLE_MESSAGES.ARTICLE_NOT_FOUND,
      });
    }

    return res.json(updated);
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

// ================= DELETE =================
export const remove = async (req, res) => {
  try {
    await service.deleteArticle(req.params.id);

    return res.json({
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

// ================= GET DETAIL =================
export const getDetail = async (req, res) => {
  try {
    const data = await service.getArticleById(req.params.id);

    if (!data) {
      return res.status(404).json({
        message: ARTICLE_MESSAGES.ARTICLE_NOT_FOUND,
      });
    }

    const formatted = {
      ...data.toObject(),
      ...calculatePrice(data.price, data.discount),
    };

    return res.json({
      success: true,
      data: formatted,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

// ================= GET LIST =================
export const getList = async (req, res) => {
  try {
    const data = await service.getArticles(req.query);

    const safeItems = Array.isArray(data?.posts) ? data.posts : [];

    const articles = safeItems.map((item) => ({
      ...item.toObject(),
      ...calculatePrice(item.price, item.discount),
    }));

    return res.json({
      success: true,
      ...data,
      posts: articles,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

// ================= GET BY SLUG =================
export const getBySlug = async (req, res) => {
  try {
    const data = await service.getArticleBySlug(req.params.slug);

    if (!data) {
      return res.status(404).json({
        message: ARTICLE_MESSAGES.ARTICLE_NOT_FOUND,
      });
    }

    const formatted = {
      ...data.toObject(),
      ...calculatePrice(data.price, data.discount),
    };

    return res.json({
      success: true,
      data: formatted,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

// ================= GENERATE SLUG AI =================
export const generateSlugAI = async (req, res) => {
  try {
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({
        message: ARTICLE_MESSAGES.TITLE_REQUIRED,
      });
    }

    const prompt = `
You are a world-class SEO copywriter and growth marketer.

Your task is to create a highly compelling, curiosity-driven URL slug
for selling automation workflows (focused on n8n).

Return ONLY the slug.

Title: "${title}"
`;

    const response = await openai.responses.create({
      model: "gpt-4.1-mini",
      input: prompt,
    });

    let baseSlug = response.output_text || "";

    if (!baseSlug) {
      throw new Error(ARTICLE_MESSAGES.EMPTY_AI_RESPONSE);
    }

    baseSlug = baseSlug
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");

    let slug = baseSlug;
    let count = 1;

    while (await service.isSlugTaken(slug)) {
      slug = `${baseSlug}-${count++}`;
    }

    return res.json({ slug });
  } catch (err) {
    let baseSlug = slugify(req.body.title || "", {
      lower: true,
      strict: true,
    });

    let slug = baseSlug;
    let count = 1;

    while (await service.isSlugTaken(slug)) {
      slug = `${baseSlug}-${count++}`;
    }

    return res.json({ slug });
  }
};

// ================= CATEGORIES =================
export const getCategories = async (req, res) => {
  try {
    const categories = await service.getCategories();
    return res.json({ success: true, categories });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name || !String(name).trim()) {
      return res.status(400).json({ message: "Category name is required" });
    }

    const created = await service.createCategory(name, req.user?._id || req.user?.id);

    return res.status(201).json({ success: true, category: created });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
