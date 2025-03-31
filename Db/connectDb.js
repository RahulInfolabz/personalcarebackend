require("dotenv").config();
const MongoClient = require("mongodb").MongoClient;

const connectDb = async () => {
  const dbUrl = process.env.MONGO_URI;

  try {
    const client = await MongoClient.connect(dbUrl);
    console.log("Db Connected");
    return client.db();
  } catch (e) {
    console.log("Db Connection Falid ", e);
  }
};

module.exports = connectDb;
