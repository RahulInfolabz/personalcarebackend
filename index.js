const express = require("express");
const cors = require("cors");
const connectDb = require("./Db/connectDb.js");
const insertProducts = require("./Apis/Admin/Products/insertProducts.js");
const insertCategories = require("./Apis/Admin/Categories/insertcategories.js");
const fetchAllProducts = require("./Apis/User/Products/fetchAllProducts.js");
const fetchAllCategories = require("./Apis/User/Categories/fetchAllCategories.js");
const insertCategory = require("./Apis/Admin/Categories/insertCategory.js");
const insertProduct = require("./Apis/Admin/Products/insertProduct.js");
const fetchProductsByCategory = require("./Apis/User/Categories/fetchProductsByCategory.js");
const fetchProductById = require("./Apis/User/Products/fetchProductsById.js");
const updateProductsCategory = require("./Apis/User/Categories/updateCategoryId.js");
const searchProducts = require("./Apis/User/Products/searchProducts.js");
const {
  AddProductInquiry,
} = require("./Apis/User/Products/insertProductInquiry.js");
const { AddContactInquiry } = require("./Apis/User/Products/storeContact.js");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));app.use(
  cors({
    origin: function (origin, callback) {
      const allowedOrigins = [
        "http://localhost:3000",
        "http://localhost:3001",
        "http://localhost:5173",
        "http://localhost:5174",
      ];

      if (
        !origin || // allow non-browser requests like curl, Postman
        allowedOrigins.includes(origin) ||
        /https?:\/\/.*\.?onrender\.com$/.test(origin)
      ) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
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
      ProductsByCategoryId:
        "https://personalcarebackend.onrender.com/category/1",
      ProductsDetails:
        "https://personalcarebackend.onrender.com/products/67ea1b94f447754573c3be77",
    },
  });
});
app.get("/products", fetchAllProducts);
app.get("/categories", fetchAllCategories);
app.get("/category/:category_id", fetchProductsByCategory);
app.get("/products/:product_id", fetchProductById);

app.post("/storeProductInquiry", AddProductInquiry);
app.post("/searchProducts", searchProducts);
app.post("/updateProductsCategory", updateProductsCategory);
app.post("/storeContactInquiry", AddContactInquiry);

// Starting the Express server
app.listen(PORT, () => console.log(`Server started on PORT ${PORT}!`));
