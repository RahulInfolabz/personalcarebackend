const connectDb = require("../../../Db/connectDb");

async function fetchAllCategories(req, res) {
  try {
    const database = await connectDb();
    const collection = database.collection("categories");

    const categories = await collection.find({ status: "active" }).toArray();

    if (categories.length > 0) {
      return res
        .status(200)
        .json({ message: "Fetched All Categories", categories: categories });
    } else {
      return res
        .status(404)
        .json({ message: "No Categories Found", categories: null });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = fetchAllCategories;
