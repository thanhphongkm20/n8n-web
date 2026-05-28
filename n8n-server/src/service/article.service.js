import Article from "../models/article.model.js";

export const isSlugTaken = async (slug) => {
  return Boolean(await Article.exists({ slug }));
};

export const createArticle = async (data, userId) => {
  return await Article.create({
    ...data,
    created_by: userId,
    updated_by: userId,
  });
};

export const updateArticle = async (id, data, userId) => {
  return await Article.findByIdAndUpdate(
    id,
    { ...data, updated_by: userId },
    { returnDocument: "after" },
  );
};

export const deleteArticle = async (id) => {
  return await Article.findByIdAndDelete(id);
};

export const getArticleById = async (id) => {
  return await Article.findById(id);
};

export const getArticleBySlug = async (slug) => {
  return await Article.findOne({ slug, status: "published" });
};

export const getArticles = async (query) => {
  const { page = 1, limit = 10, search = "", status } = query;

  const filter = {};

  if (search) {
    filter.title = { $regex: search, $options: "i" };
  }

  if (status) {
    filter.status = status;
  }

  const pageNum = parseInt(page, 10);
  const limitNum = parseInt(limit, 10);

  const items = await Article.find(filter)
    .skip((pageNum - 1) * limitNum)
    .limit(limitNum)
    .sort({ createdAt: -1 });

  const total = await Article.countDocuments(filter);

  return { items, total };
};
