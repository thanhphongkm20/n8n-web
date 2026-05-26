import Blog from "../models/blog.model.js";

export const blogService = {
  async create(payload) {
    const existed = await Blog.findOne({
      slug: payload.slug,
    });

    if (existed) {
      throw new Error("Blog slug already exists");
    }

    const blog = await Blog.create(payload);

    return blog;
  },

  async getAll(query) {
    const { page = 1, limit = 10, type, keyword, status, is_featured } = query;

    const filter = {};

    if (type) filter.type = type;

    if (status) filter.status = status;

    if (is_featured !== undefined) {
      filter.is_featured = is_featured === "true";
    }

    if (keyword) {
      filter.$or = [
        {
          title: {
            $regex: keyword,
            $options: "i",
          },
        },
        {
          excerpt: {
            $regex: keyword,
            $options: "i",
          },
        },
        {
          tags: {
            $regex: keyword,
            $options: "i",
          },
        },
      ];
    }

    const skip = (Number(page) - 1) * Number(limit);

    const [items, total] = await Promise.all([
      Blog.find(filter).sort("-createdAt").skip(skip).limit(Number(limit)),

      Blog.countDocuments(filter),
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
    const blog = await Blog.findById(id);

    if (!blog) {
      throw new Error("Blog not found");
    }

    return blog;
  },

  async getBySlug(slug) {
    const blog = await Blog.findOne({ slug });

    if (!blog) {
      throw new Error("Blog not found");
    }

    blog.view_count += 1;

    await blog.save();

    return blog;
  },

  async update(id, payload) {
    const blog = await Blog.findByIdAndUpdate(id, payload, {
      returnDocument: "after",
    });

    if (!blog) {
      throw new Error("Blog not found");
    }

    return blog;
  },

  async remove(id) {
    const blog = await Blog.findByIdAndDelete(id);

    if (!blog) {
      throw new Error("Blog not found");
    }

    return blog;
  },
};
