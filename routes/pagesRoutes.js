import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.render("pages/index.ejs");
});

router.get("/contact", (req, res) => {
  res.render("pages/contact.ejs");
});
router.get("/about", (req, res) => {
  res.render("pages/about.ejs");
});
router.get("/alterations", (req, res) => {
  res.render("pages/alteration");
});
router.get("/excellence", (req, res) => {
  res.render("pages/excellence");
});

export default router;
