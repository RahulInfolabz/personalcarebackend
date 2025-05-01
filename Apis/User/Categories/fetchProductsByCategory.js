const { ObjectId } = require("mongodb");
const connectDb = require("../../../Db/connectDb");

async function fetchProductsByCategory(req, res) {
  try {
    const { category_id } = req.params;

    const db = await connectDb();

    const collection = db.collection("products");

    const products = await collection
      .find({
        category_id: ObjectId.createFromHexString(category_id),
        status: "active",
      })
      .toArray();

    if (products.length > 0) {
      res.status(200).json({
        success: true,
        message: "Products fetched successfully.",
        products, // Send the list of products
      });
    } else {
      res.status(404).json({
        success: false,
        message: "No products found for the given category.",
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

module.exports = fetchProductsByCategory;
