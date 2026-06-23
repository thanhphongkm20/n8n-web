import Order from "../models/order.model.js";
import Article from "../models/article.model.js";

const BANK_INFO = {
  bankName: "BIDV",
  accountName: "Lê Đình Thanh Phong",
  accountNumber: "1320566390",
};

const USD_TO_VND = 26000;

const generateTransferCode = () =>
  `${Math.random().toString(36).slice(2, 10).toUpperCase()}`;

export const createOrder = async (articleId, userId) => {
  const article = await Article.findById(articleId);

  if (!article) {
    return null;
  }

  const amountUsd =
    parseFloat((article.price_formatted || "").replace("$", "")) ||
    Number(article.price) ||
    0;
  const amountVnd = Math.round(amountUsd * USD_TO_VND);

  const order = await Order.create({
    article: article._id,
    user: userId,
    amount: amountUsd,
    transferAmount: amountVnd,
    transferCode: generateTransferCode(),
  });

  return { order, amountVnd, bank: BANK_INFO };
};

export const getOrderById = async (id) => {
  return await Order.findById(id).populate("article");
};

export const markOrderPaid = async (id) => {
  return await Order.findByIdAndUpdate(
    id,
    {
      status: "paid",
      paidAt: new Date(),
    },
    { new: true },
  ).populate("article");
};