import slugify from "slugify";
import Article from "../models/article.model.js";
import * as service from "../service/article.service.js";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// ================= CREATE =================
export const create = async (req, res) => {
  try {
    const data = req.validated;

    // ================= FILE =================
    if (req.files?.image) {
      data.image = req.files.image[0].originalname;
    }

    if (req.files?.workflow) {
      try {
        const json = JSON.parse(req.files.workflow[0].buffer.toString());

        if (!json || typeof json !== "object" || Array.isArray(json)) {
          return res.status(400).json({
            message: "Invalid workflow format",
          });
        }

        data.workflow = json;
      } catch {
        return res.status(400).json({
          message: "Invalid workflow JSON file",
        });
      }
    }
    if (!req.files?.image) {
      return res.status(400).json({
        message: "Product image is required",
      });
    }

    if (!req.files?.workflow) {
      return res.status(400).json({
        message: "Workflow file is required",
      });
    }

    // ================= SLUG =================
    let baseSlug =
      data.slug && data.slug.trim() !== ""
        ? slugify(data.slug, { lower: true, strict: true })
        : slugify(data.title, { lower: true, strict: true });

    let slug = baseSlug;
    let count = 1;

    while (await Article.findOne({ slug })) {
      slug = `${baseSlug}-${count++}`;
    }

    data.slug = slug;

    // ================= SAVE =================
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
    const data = req.validated.body;

    // FILE
    if (req.files?.image) {
      data.image = req.files.image[0].originalname;
    }

    if (req.files?.workflow) {
      try {
        data.workflow = JSON.parse(req.files.workflow[0].buffer.toString());
      } catch {
        return res.status(400).json({ message: "Invalid JSON file" });
      }
    }

    const updated = await service.updateArticle(
      req.params.id,
      data,
      req.user._id,
    );

    if (!updated) {
      return res.status(404).json({ message: "Article not found" });
    }

    if (data.slug) {
      let baseSlug = slugify(data.slug, { lower: true, strict: true });
      let slug = baseSlug;
      let count = 1;

      while (await Article.findOne({ slug, _id: { $ne: req.params.id } })) {
        slug = `${baseSlug}-${count++}`;
      }

      data.slug = slug;
    }

    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ message: err.message });
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
You are an expert SEO copywriter.

Rewrite the following title into a highly compelling, click-worthy, SEO-optimized URL slug.

Requirements:
- Make it catchy, emotional, and attention-grabbing
- Keep strong keywords for SEO
- Use lowercase only
- Use hyphens (-)
- Remove all special characters
- Max 8 words

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
    console.error("OPENAI ERROR:", err);

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
