const startUpMessage = "MongoDb Connection online."
import { MongoClient } from "mongodb";
const client = new MongoClient(process.env.DB_URL);
let connection = await client.connect();
const db = connection.db("AuthDb");

export const userColl = db.collection("users");
console.log(startUpMessage)