import Joi from "joi";

export const createArticleSchema = Joi.object({
  title: Joi.string().trim().min(3).max(255).required(),

  description: Joi.string().required(),

  price: Joi.number().min(0).required(),

  image: Joi.string().uri().allow("", null),

  status: Joi.string().valid("draft", "published"),

  slug: Joi.string().optional(),
});

export const updateArticleSchema = Joi.object({
  title: Joi.string().trim().min(3).max(255),

  description: Joi.string(),

  price: Joi.number().min(0),

  image: Joi.string().uri().allow("", null),

  status: Joi.string().valid("draft", "published"),

  slug: Joi.string(),
});