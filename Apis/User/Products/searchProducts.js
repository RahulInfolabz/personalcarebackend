const connectDb = require("../../../Db/connectDb");

async function searchProducts(req, res) {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({
        success: false,
        message: "Search query is required.",
      });
    }

    const db = await connectDb();
    const collection = db.collection("products");

    // Search for products by product_name OR brand_name (case-insensitive)
    const products = await collection
      .find({
        $or: [
          { product_name: { $regex: query, $options: "i" } },
          { brand_name: { $regex: query, $options: "i" } },
        ],
      })
      .toArray();

    if (products.length > 0) {
      res.status(200).json({
        success: true,
        message: "Products found successfully.",
        products,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "No products found matching the search query.",
      });
    }
  } catch (e) {
    res.status(500).json({
      success: false,
      error: "An unexpected error occurred on the server.",
      message: "Internal Server Error. Please try again later.",
    });
  }
}

module.exports = searchProducts;
