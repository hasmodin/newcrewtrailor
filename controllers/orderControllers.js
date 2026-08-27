import { Order } from "../models/Order.js";

export const getOrderPage = (req, res) => {
  res.render("pages/new-order");
};

export const getBlankNewOderForm = (req, res) => {
  res.render("new-order");
};

export const getNewOrder = async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    // console.log(newOrder);
    const savedOrder = await newOrder.save();
    res.redirect(`/orders/${savedOrder._id}/print`);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const getPrintablePage = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).send("Order not found");
    res.render("pages/print-order", { order });
  } catch (err) {
    res.status(500).send("Error fetching order: " + err.message);
  }
};
