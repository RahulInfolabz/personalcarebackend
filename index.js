const express = require("express");
const cors = require("cors");
const connectDb = require("./Db/connectDb.js");
const insertProducts = require("./Apis/Admin/Products/insertProducts.js");
const insertCategories = require("./Apis/Admin/Categories/insertcategories.js");
const fetchAllProducts = require("./Apis/User/Products/fetchAllProducts.js");
const fetchAllCategories = require("./Apis/User/Categories/fetchAllCategories.js");
const insertCategory = require("./Apis/Admin/Categories/insertCategory.js");
const insertProduct = require("./Apis/Admin/Products/insertProduct.js");
const fetchProductsByCategory = require("./Apis/User/Products/fetchProductsByCategory.js");
const fetchProductById = require("./Apis/User/Products/fetchProductsById.js");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"], // Allowed frontend URLs
    credentials: true, // Allow cookies and sessions to be shared across origins
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
  })
);

connectDb();

// admin
app.post("/insertCategories", insertCategories);
app.post("/insertProducts", insertProducts);
app.post("/insertProduct", insertProduct);
app.post("/insertCategory", insertCategory);

// user
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server Connected.",
    Apis: {
      Products: "https://personalcarebackend.onrender.com/products",
      Categories: "https://personalcarebackend.onrender.com/categories",
    },
  });
});
app.get("/products", fetchAllProducts);
app.get("/categories", fetchAllCategories);
app.get("/category/:category_id", fetchProductsByCategory);
app.get("/products/:product_id", fetchProductById);

// Starting the Express server
app.listen(PORT, () => console.log(`Server started on PORT ${PORT}!`));
