import "dotenv/config";
import express from "express";
const app = express();
const PORT = process.env.PORT || 3000;

import path from "path";
import { fileURLToPath } from "url";
import ejsMate from "ejs-mate";
import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_API_KEY);
import pagesRoutes from "./routes/pagesRoutes.js";
import productsRoutes from "./routes/productsRoutes.js";
import { connectMongoDbAtlas } from "./database/index.js";
import { Order } from "./models/Order.js";
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

// Pages routes
app.use("/", pagesRoutes);

app.post("/contact", async (req, res) => {
  let { name, email, service, message } = req.body;

  try {
    let data = await resend.emails.send({
      from: "newcrewtailor.com@newcrewtailor.com", // Try sending WITHOUT display name first
      to: "newcrewtailor.com@newcrewtailor.com",
      replyTo: email,
      subject: `New Inquiry : ${service} from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; border: 1px solid #c0392b; padding: 20px;">
            <h2 style="color: #c0392b;">New Crew Tailor Inquiry</h2>
            <p><strong>Customer Name:</strong> ${name}</p>
            <p><strong>Customer Email:</strong> ${email}</p>
            <p><strong>Interested In:</strong> ${service}</p>
            <hr>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
        </div>
      `,
    });
    console.log("Email sent successfully:", data);
    res.render("pages/contact-success", { name });
  } catch (error) {
    console.error("Email error:", error);
    res
      .status(500)
      .send("<h1>Oops! Something went wrong. Please call us at 55066593.</h1>");
  }
});

app.get("/orders", (req, res) => {
  res.render("pages/new-order");
});

// 1. Render blank order form
app.get("/orders/new", (req, res) => {
  res.render("new-order");
});

// 2. Save order to MongoDB Atlas and redirect to printable view
app.post("/orders", async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    // console.log(newOrder);
    const savedOrder = await newOrder.save();
    res.redirect(`/orders/${savedOrder._id}/print`);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// 3. Render printable view for a specific order
app.get("/orders/:id/print", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).send("Order not found");
    res.render("pages/print-order", { order });
  } catch (err) {
    res.status(500).send("Error fetching order: " + err.message);
  }
});

// products routes
app.use("/products", productsRoutes);

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
