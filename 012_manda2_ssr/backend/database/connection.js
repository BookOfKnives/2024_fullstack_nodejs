import { MongoClient } from "mongodb";

const startUpMessage = "MongoDb Connection online."

const client = new MongoClient(process.env.MONGO_URL);
let connection;
try {
    connection = await client.connect();
} catch (err) {
    console.error(err);
}
const db = connection.db(process.env.MONGO_AUTH_DB);

const userColl = db.collection("users");
const sessionColl = db.collection("sessions");

console.log(startUpMessage);

export {
    userColl,
    sessionColl,
};