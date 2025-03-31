const { ObjectId } = require("mongodb");
const connectDb = require("../../../Db/connectDb");

async function insertProduct(req, res) {
  try {
    // Connect to the database
    const db = await connectDb();

    // Get the products collection
    const collection = db.collection("products");

    // Extract product data from request body
    const {
      name,
      category_id,
      type,
      description,
      price,
      stock_quantity,
      images,
      material,
      featured,
      tags,
    } = req.body;

    // Prepare the product data for insertion
    const productData = {
      name,
      category_id: parseInt(category_id), // Ensure category_id is stored as an integer
      type,
      description,
      price: parseFloat(price), // Convert price to a float
      stock_quantity: parseInt(stock_quantity), // Convert stock_quantity to integer
      images: images || [],
      material,
      featured: featured === "true" || featured === true, // Handle boolean for featured
      tags: tags || [],
    };

    // Insert product data into the collection
    const insert = await collection.insertOne(productData);

    if (insert.acknowledged) {
      res.status(201).json({
        success: true,
        message: "Product inserted successfully.",
        data: {
          ...productData,
          _id: insert.insertedId.toHexString(), // Convert _id to hex string
        },
      });
    } else {
      res.status(400).json({
        success: false,
        error: "Failed to insert product.",
        message:
          "Data insertion was unsuccessful. Please check the request and try again.",
      });
    }
  } catch (e) {
    console.error("Error inserting product:", e);
    res.status(500).json({
      success: false,
      error: "An unexpected error occurred on the server.",
      message: "Internal Server Error. Please try again later.",
    });
  }
}

module.exports = insertProduct;
