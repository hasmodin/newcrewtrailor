import express from "express";
const router = express.Router();

router.get("/formal", (req, res) => {
  res.render("pages/products/formal.ejs");
});

router.get("/uniforms", (req, res) => {
  res.render("pages/products/uniform.ejs");
});
router.get("/accessories", (req, res) => {
  res.render("pages/products/accessories.ejs");
});

export default router;
