import Resource from "../models/resource.model.js";

export const resourceService = {
  async create(payload) {
    const existed = await Resource.findOne({ slug: payload.slug });

    if (existed) {
      throw new Error("Resource slug already exists");
    }

    return Resource.create(payload);
  },

  async getAll(query) {
    const {
      page = 1,
      limit = 10,
      type,
      status,
      keyword,
      is_featured,
      sort = "-createdAt",
    } = query;

    const filter = {};

    if (type) filter.type = type;
    if (status) filter.status = status;
    if (is_featured !== undefined) filter.is_featured = is_featured === "true";

    if (keyword) {
      filter.$or = [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
        { tags: { $regex: keyword, $options: "i" } },
      ];
    }

    const skip = (Number(page) - 1) * Number(limit);

    const [items, total] = await Promise.all([
      Resource.find(filter)
        .sort(sort)
        .skip(skip)
        .limit(Number(limit)),
      Resource.countDocuments(filter),
    ]);

    return {
      items,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        total_pages: Math.ceil(total / Number(limit)),
      },
    };
  },

  async getById(id) {
    const resource = await Resource.findById(id);

    if (!resource) {
      throw new Error("Resource not found");
    }

    return resource;
  },

  async getBySlug(slug) {
    const resource = await Resource.findOne({ slug });

    if (!resource) {
      throw new Error("Resource not found");
    }

    resource.view_count += 1;
    await resource.save();

    return resource;
  },

  async update(id, payload) {
    if (payload.slug) {
      const existed = await Resource.findOne({
        slug: payload.slug,
        _id: { $ne: id },
      });

      if (existed) {
        throw new Error("Resource slug already exists");
      }
    }

    const resource = await Resource.findByIdAndUpdate(id, payload, {
      returnDocument: "after",
      runValidators: true,
    });

    if (!resource) {
      throw new Error("Resource not found");
    }

    return resource;
  },

  async remove(id) {
    const resource = await Resource.findByIdAndDelete(id);

    if (!resource) {
      throw new Error("Resource not found");
    }

    return resource;
  },
};