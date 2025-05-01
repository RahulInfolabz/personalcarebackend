const connectDb = require("../../../Db/connectDb");

async function insertCategory(req, res) {
  try {
    // get database
    const db = await connectDb();

    // get collection
    const collection = db.collection("categories");

    const { category_id, name, image, description } = req.body;

    // write here query
    const insert = await collection.insertOne({
      category_id,
      name,
      image,
      description,
      status: "active",
    });

    if (insert.acknowledged) {
      res.status(201).json({
        success: true,
        message: "Data inserted successfully.",
        data: {},
      });
    } else {
      res.status(400).json({
        success: false,
        error: "Failed to insert data.",
        message:
          "Data insertion was unsuccessful. Please check the request and try again.",
      });
    }

    // Your MongoDB query here
  } catch (e) {
    res.status(500).json({
      success: false,
      error: "An unexpected error occurred on the server.",
      message: "Internal Server Error. Please try again later.",
    });
  }
}

module.exports = insertCategory;
