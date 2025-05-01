const connectDb = require("../../../Db/connectDb");

async function fetchAllProducts(req, res) {
  try {
    const db = await connectDb();
    const collection = db.collection("products");

    const products = await collection.find({ status: "active" }).toArray();

    if (products.length == 0) {
      return res.status(404).json({ message: "No Data Found" });
    } else {
      return res
        .status(200)
        .json({ message: `data found ${products.length}`, data: products });
    }
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
}

module.exports = fetchAllProducts;
