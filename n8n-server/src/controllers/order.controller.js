import { ORDER_MESSAGES } from "../configs/messages.js";
import * as orderService from "../service/order.service.js";

export const createOrder = async (req, res) => {
  try {
    const { articleId } = req.body;

    const result = await orderService.createOrder(articleId, req.user?._id);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: ORDER_MESSAGES.ARTICLE_NOT_FOUND,
      });
    }

    const { order, amountVnd, bank } = result;
    const qrUrl = `https://img.vietqr.io/image/BIDV-${bank.accountNumber}-compact.png?amount=${amountVnd}&addInfo=${order.transferCode}&accountName=${encodeURIComponent(
      bank.accountName,
    )}`;

    return res.status(201).json({
      success: true,
      data: {
        orderId: order._id,
        amount: order.amount,
        transferAmount: amountVnd,
        transferCode: order.transferCode,
        qrUrl,
        bank,
        status: order.status,
      },
    });
  } catch (error) {
    console.error("Create order error:", error);
    return res.status(500).json({
      success: false,
      message: ORDER_MESSAGES.CREATE_ORDER_FAILED,
    });
  }
};

export const getOrder = async (req, res) => {
  try {
    const order = await orderService.getOrderById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: ORDER_MESSAGES.ORDER_NOT_FOUND,
      });
    }

    return res.json({
      success: true,
      data: order,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: ORDER_MESSAGES.GET_ORDER_FAILED,
    });
  }
};

export const markOrderPaid = async (req, res) => {
  try {
    const order = await orderService.markOrderPaid(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: ORDER_MESSAGES.ORDER_NOT_FOUND,
      });
    }

    return res.json({
      success: true,
      data: order,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: ORDER_MESSAGES.UPDATE_ORDER_FAILED,
    });
  }
};