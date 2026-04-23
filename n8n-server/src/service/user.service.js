import { User } from "../models/user.model.js";

const save = async (user) => {
  await user.save();
  return user;
};

const findByEmailForAuth = async (email) => {
  return await User.findOne({ email }).select("+password +salt");
};

const findByIdForAuth = async (id) => {
  return await User.findById(id);
};

const create = async (data) => {
  const { email, phone } = data;

  // 👉 check email
  const existEmail = await User.findOne({ email });
  if (existEmail) {
    throw new Error("EMAIL_EXISTS");
  }

  // 👉 check phone
  const existPhone = await User.findOne({ phone });
  if (existPhone) {
    throw new Error("PHONE_EXISTS");
  }

  const user = new User(data);
  await user.save();

  return User.findById(user._id);
};

const findOne = async (query) => {
  const user = await User.findOne(query);
  return user;
};

const list = async (query, skip, limit) => {
  const [users, count] = await Promise.all([
    User
      .find(query)
      .skip(skip)
      .limit(limit)
      .populate("created_by", "display_name email")
      .sort("-created_at"),
    User.countDocuments(query),
  ]);
  return { users, count };
};

const findById = async (id) => {
  const user = await User.findById(id);
  return user;
};

export default {
  save,
  create,
  findOne,
  list,
  findById,
  findByEmailForAuth,
  findByIdForAuth,
};
