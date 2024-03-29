const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const donorRoute = require("./routes/donor");
const helpRoute = require("./routes/help");
const stripeRoute = require("./routes/stripe");
const cors = require("cors");

const username = encodeURIComponent("<username>");
const password = encodeURIComponent("<password>");
mongoose
  .connect("mongodb+srv://admin2:gxHcfPKzV30lJauG@cluster0.ccamx.mongodb.net/shop?retryWrites=true&w=majority")
  .then(() => console.log("DB Connection Successfull!"))
  .catch((err) => {
    console.log(err);
  });

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/donors", donorRoute);
app.use("/api/helps", helpRoute);
app.use("/api/checkout", stripeRoute);

app.listen(process.env.PORT || 5000, () => {
  console.log("Backend server is running!");
});
