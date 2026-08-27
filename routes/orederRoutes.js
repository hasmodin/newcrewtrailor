import express from "express";

const router = express.Router();
import {
  getOrderPage,
  getBlankNewOderForm,
  getNewOrder,
  getPrintablePage,
} from "../controllers/orderControllers.js";

router.get("/", getOrderPage);

// 1. Render blank order form
router.get("/new", getBlankNewOderForm);

// 2. Save order to MongoDB Atlas and redirect to printable view
router.post("/", getNewOrder);

// 3. Render printable view for a specific order
router.get("/:id/print", getPrintablePage);

export default router;
