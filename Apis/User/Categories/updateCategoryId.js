const { ObjectId } = require("mongodb");
const connectDb = require("../../../Db/connectDb");

async function updateProductsCategory(req, res) {
  try {
    const { old_category_id, new_category_id } = req.body;

    console.log(old_category_id, new_category_id);

    if (!old_category_id || !new_category_id) {
      return res.status(400).json({
        success: false,
        message: "Both old_category_id and new_category_id are required.",
      });
    }

    const db = await connectDb();
    const collection = db.collection("products");

    // Update all products with the given category_id
    const updateResult = await collection.updateMany(
      { category_id: old_category_id },
      { $set: { category_id: ObjectId.createFromHexString(new_category_id) } }
    );

    if (updateResult.modifiedCount > 0) {
      res.status(200).json({
        success: true,
        message: `${updateResult.modifiedCount} products updated successfully.`,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "No products found for the given category_id.",
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

module.exports = updateProductsCategory;
