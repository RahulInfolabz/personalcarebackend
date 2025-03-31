const connectDb = require("../../../Db/connectDb");

async function insertCategories(req, res) {
  try {
    const database = await connectDb();
    const collection = database.collection("categories");
    const categories = req.body;

    const insertcategories = await collection.insertMany(categories);

    if (insertcategories.acknowledged) {
      return res
        .status(201)
        .json({ success: true, message: "Categories addedd successful" });
    } else {
      return res
        .status(404)
        .json({ success: false, message: "Data Not Inserted" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
}

module.exports = insertCategories;
