import slugify from "slugify";
import Article from "../models/article.model.js";
import * as service from "../service/article.service.js";

export const create = async (req, res) => {
  try {
    const data = req.validatedBody; // ✅ dùng data đã validate

    // 🔥 1. generate slug
    let baseSlug = slugify(data.title, { lower: true, strict: true });
    let slug = baseSlug;
    let count = 1;

    // 🔥 2. check trùng slug
    while (await Article.findOne({ slug })) {
      slug = `${baseSlug}-${count++}`;
    }

    data.slug = slug;

    // 🔥 3. thêm user tạo
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

export const update = async (req, res) => {
  try {
    const data = await service.updateArticle(
      req.params.id,
      req.body,
      req.user._id,
    );
    if (!data) {
      return res.status(404).json({ message: "Article not found" });
    }
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const remove = async (req, res) => {
  try {
    await service.deleteArticle(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

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