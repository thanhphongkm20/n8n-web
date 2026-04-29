import slugify from "slugify";
import Article from "../models/article.model.js";
import * as service from "../service/article.service.js";
import { uploadImage, uploadFile } from "../utils/uploadToCloudinary.js";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// ================= CREATE =================
export const create = async (req, res) => {
  try {
    const data = req.validated;

    // ================= FILE =================
    if (!req.files?.image || !req.files?.workflow) {
      return res.status(400).json({
        message: "Image and workflow are required",
      });
    }

    const imageUrl = await uploadImage(req.files.image[0]);

    const workflowUrl = await uploadFile(req.files.workflow[0]);

    data.image = imageUrl;
    data.workflow = workflowUrl;

    // ================= SLUG =================
    let baseSlug = data.slug
      ? slugify(data.slug, { lower: true, strict: true })
      : slugify(data.title, { lower: true, strict: true });

    let slug = baseSlug;
    let count = 1;

    while (await Article.findOne({ slug })) {
      slug = `${baseSlug}-${count++}`;
    }

    data.slug = slug;

    const article = await Article.create({
      ...data,
      created_by: req.user.id,
      updated_by: req.user.id,
    });

    return res.status(201).json(article);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// ================= UPDATE =================
export const update = async (req, res) => {
  try {
    const data = req.validated;

    if (req.files?.image) {
      data.image = await uploadImage(req.files.image[0]);
    }

    if (req.files?.workflow) {
      data.workflow = await uploadFile(req.files.workflow[0]);
    }

    const updated = await service.updateArticle(
      req.params.id,
      data,
      req.user._id,
    );

    if (!updated) {
      return res.status(404).json({ message: "Article not found" });
    }

    return res.json(updated);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// ================= DELETE =================
export const remove = async (req, res) => {
  try {
    await service.deleteArticle(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ================= GET =================
export const getDetail = async (req, res) => {
  try {
    const data = await service.getArticleById(req.params.id);
    if (!data) {
      return res.status(404).json({ message: "Article not found" });
    }
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getList = async (req, res) => {
  try {
    const data = await service.getArticles(req.query);
    res.json({ success: true, ...data });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getBySlug = async (req, res) => {
  try {
    const data = await service.getArticleBySlug(req.params.slug);
    if (!data) {
      return res.status(404).json({ message: "Article not found" });
    }
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ================= GENERATE SLUG AI =================
export const generateSlugAI = async (req, res) => {
  try {
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const prompt = `
You are a world-class SEO copywriter and growth marketer.

Your task is to create a highly compelling, curiosity-driven URL slug for selling automation workflows (focused on n8n).

IMPORTANT:

* DO NOT reuse or summarize the original title
* The slug must feel like a hook, not a description

Goals:

* Maximize curiosity and click-through rate
* Emphasize benefits: automation, making money, saving time
* Use emotional trigger words (secret, hack, auto, fast, scale, hidden)

Rules:

* lowercase only
* use SPACES between words (NOT hyphens, NOT combined words)
* no special characters
* max 6 words
* keep it short, punchy, and natural to read
* avoid boring or generic phrasing

Good examples:

* n8n money hack
* automation secret system
* auto workflow make money
* hidden n8n profit system
* scale fast with automation

Bad examples:

* n8n workflow tutorial
* how to use n8n
* automation guide basic

Title: "${title}"

Return ONLY the slug.

`;

    const response = await openai.responses.create({
      model: "gpt-4.1-mini",
      input: prompt,
    });

    let baseSlug = response.output_text || "";

    if (!baseSlug) {
      throw new Error("Empty AI response");
    }

    // clean slug
    baseSlug = baseSlug
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");

    // ✅ CHECK DUPLICATE
    let slug = baseSlug;
    let count = 1;

    while (await Article.findOne({ slug })) {
      slug = `${baseSlug}-${count++}`;
    }

    return res.json({ slug });
  } catch (err) {
    // fallback
    let baseSlug = slugify(req.body.title || "", {
      lower: true,
      strict: true,
    });

    let slug = baseSlug;
    let count = 1;

    while (await Article.findOne({ slug })) {
      slug = `${baseSlug}-${count++}`;
    }

    return res.json({ slug });
  }
};
