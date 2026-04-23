import * as service from "../service/article.service.js";

export const create = async (req, res) => {
  try {
    const payload = req.validatedBody || req.body;
    const data = await service.createArticle(payload, req.user._id);
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ message: err.message });
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