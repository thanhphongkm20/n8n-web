import { RESOURCE_MESSAGES } from "../configs/messages.js";
import { ApiResponse } from "../configs/response.js";
import { resourceService } from "../service/resource.service.js";

export const resourceController = {
  async create(req, res, next) {
    try {
      const data = await resourceService.create(req.body);

      return ApiResponse.Created(res, {
        message: RESOURCE_MESSAGES.CREATE_SUCCESS,
        data,
      });
    } catch (error) {
      next(error);
    }
  },

  async getAll(req, res, next) {
    try {
      const data = await resourceService.getAll(req.query);

      return ApiResponse.OK(res, {
        message: RESOURCE_MESSAGES.GET_LIST_SUCCESS,
        data,
      });
    } catch (error) {
      next(error);
    }
  },

  async getById(req, res, next) {
    try {
      const data = await resourceService.getById(req.params.id);

      return ApiResponse.OK(res, {
        message: RESOURCE_MESSAGES.GET_SUCCESS,
        data,
      });
    } catch (error) {
      next(error);
    }
  },

  async getBySlug(req, res, next) {
    try {
      const data = await resourceService.getBySlug(req.params.slug);

      return ApiResponse.OK(res, {
        message: RESOURCE_MESSAGES.GET_SUCCESS,
        data,
      });
    } catch (error) {
      next(error);
    }
  },

  async update(req, res, next) {
    try {
      const data = await resourceService.update(
        req.params.id,
        req.body
      );

      return ApiResponse.OK(res, {
        message: RESOURCE_MESSAGES.UPDATE_SUCCESS,
        data,
      });
    } catch (error) {
      next(error);
    }
  },

  async remove(req, res, next) {
    try {
      const data = await resourceService.remove(req.params.id);

      return ApiResponse.OK(res, {
        message: RESOURCE_MESSAGES.DELETE_SUCCESS,
        data,
      });
    } catch (error) {
      next(error);
    }
  },
};