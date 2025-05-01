const { ObjectId } = require("mongodb");
const connectDb = require("../../../Db/connectDb");

async function fetchProductById(req, res) {
  try {
    // Get the _id from the URL params
    const { product_id } = req.params;

    // Connect to the database
    const db = await connectDb();

    // Get the products collection
    const collection = db.collection("products");

    // Check if product_id is a valid ObjectId
    if (!ObjectId.isValid(product_id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID format.",
      });
    }

    // Query to find the product by _id
    const product = await collection.findOne({
      _id: new ObjectId(product_id),
      status : "active"
    });

    // Check if the product exists
    if (product) {
      res.status(200).json({
        success: true,
        message: "Product fetched successfully.",
        product,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "No product found with the given ID.",
      });
    }
  } catch (e) {
    console.error("Error:", e);
    res.status(500).json({
      success: false,
      error: "An unexpected error occurred on the server.",
      message: "Internal Server Error. Please try again later.",
    });
  }
}

module.exports = fetchProductById;
