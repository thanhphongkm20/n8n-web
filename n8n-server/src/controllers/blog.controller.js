import { BLOG_MESSAGES } from "../configs/messages.js";
import { ApiResponse } from "../configs/response.js";
import { blogService } from "../service/blog.service.js";

export const blogController = {
  async create(req, res, next) {
    try {
      const data = await blogService.create(
        req.validatedBody
      );

      return ApiResponse.Created(res, {
        message: BLOG_MESSAGES.CREATE_SUCCESS,
        data,
      });
    } catch (error) {
      next(error);
    }
  },

  async getAll(req, res, next) {
    try {
      const data = await blogService.getAll(
        req.query
      );

      return ApiResponse.OK(res, {
        message: BLOG_MESSAGES.GET_ALL_SUCCESS,
        data,
      });
    } catch (error) {
      next(error);
    }
  },

  async getById(req, res, next) {
    try {
      const data = await blogService.getById(
        req.params.id
      );

      return ApiResponse.OK(res, {
        message: BLOG_MESSAGES.GET_SUCCESS,
        data,
      });
    } catch (error) {
      next(error);
    }
  },

  async getBySlug(req, res, next) {
    try {
      const data = await blogService.getBySlug(
        req.params.slug
      );

      return ApiResponse.OK(res, {
        message: BLOG_MESSAGES.GET_SUCCESS,
        data,
      });
    } catch (error) {
      next(error);
    }
  },

  async update(req, res, next) {
    try {
      const data = await blogService.update(
        req.params.id,
        req.validatedBody
      );

      return ApiResponse.OK(res, {
        message: BLOG_MESSAGES.UPDATE_SUCCESS,
        data,
      });
    } catch (error) {
      next(error);
    }
  },

  async remove(req, res, next) {
    try {
      const data = await blogService.remove(
        req.params.id
      );

      return ApiResponse.OK(res, {
        message: BLOG_MESSAGES.DELETE_SUCCESS,
        data,
      });
    } catch (error) {
      next(error);
    }
  },
};