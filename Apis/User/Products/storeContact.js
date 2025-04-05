const connectDb = require("../../../Db/connectDb");

async function AddContactInquiry(req, res) {
  try {
    const db = await connectDb();
    const collection = db.collection("ContactUs");

    const { username, email, phone, message } = req.body;

    if (!username || !email || !phone || !message) {
      res.status(404).json({
        success: false,
        message: "All Field Are Required",
      });
    }

    await collection.insertOne({
      username,
      email,
      phone,
      message,
      status: "Pending",
      timestamp: new Date(),
    });

    return res
      .status(201)
      .json({ success: true, message: "Contact Inquiry Submitted" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
}

module.exports = { AddContactInquiry };
