import Order from "../models/order.model.js";
import Article from "../models/article.model.js";

const BANK_INFO = {
  bankName: "BIDV",
  accountName: "Lê Đình Thanh Phong",
  accountNumber: "1320566390",
};

const generateTransferCode = () => {
  return `${Math.random().toString(36).slice(2, 10).toUpperCase()}`;
};

export const createOrder = async (req, res) => {
  try {
    const { articleId } = req.body;

    const article = await Article.findById(articleId);

    if (!article) {
      return res.status(404).json({
        success: false,
        message: "Article not found",
      });
    }

    const order = await Order.create({
      article: article._id,
      user: req.user?._id,
      amount: article.price,
      transferCode: generateTransferCode(),
    });

    const qrUrl = `https://img.vietqr.io/image/BIDV-1320566390-compact.png?amount=${order.amount}&addInfo=${order.transferCode}&accountName=${encodeURIComponent(
      BANK_INFO.accountName,
    )}`;

    return res.status(201).json({
      success: true,
      data: {
        orderId: order._id,
        amount: order.amount,
        transferCode: order.transferCode,
        qrUrl,
        bank: BANK_INFO,
        status: order.status,
      },
    });
  } catch (error) {
    console.error("Create order error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create order",
    });
  }
};

export const getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("article");

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    return res.json({
      success: true,
      data: order,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to get order",
    });
  }
};

export const markOrderPaid = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      {
        status: "paid",
        paidAt: new Date(),
      },
      { new: true },
    ).populate("article");

    return res.json({
      success: true,
      data: order,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update order",
    });
  }
};
