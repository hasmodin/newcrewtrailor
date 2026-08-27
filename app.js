import "dotenv/config";
import express from "express";
const app = express();
const PORT = process.env.PORT || 3000;

import path from "path";
import { fileURLToPath } from "url";
import ejsMate from "ejs-mate";

import pagesRoutes from "./routes/pagesRoutes.js";
import orderRoutes from "./routes/orederRoutes.js";
import productsRoutes from "./routes/productsRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import { connectMongoDbAtlas } from "./database/index.js";

// --- ES6 __dirname Fix ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// --- 1. EJS Setup --
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
// to serve static files
app.use(express.static(path.join(__dirname, "public")));

// connection to mongodb atlas
connectMongoDbAtlas();

app.engine("ejs", ejsMate);
app.use(express.urlencoded({ extended: true })); // read form data(URL-encoded)
app.use(express.json()); // read JSON data

// Routes
app.use("/", pagesRoutes);
app.use("/contact", contactRoutes);
app.use("/products", productsRoutes);
app.use("/orders", orderRoutes);

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
