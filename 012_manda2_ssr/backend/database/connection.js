import { MongoClient } from "mongodb";

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

//husk at sige db.coll.find().toArray();
//findOne() finder et objekt -- dvs ikke et array. flere hits er arrays, et hit er 

//test db insert below this
// const date = new Date();
// userColl.deleteMany({});
// userColl.insertMany([{ "name": "hans", "password": "some shit" }, { "name": "re", "password":"re" }, { "name": "ho", "password": "alter" }, {"time of insert": date, "message":"have anice a day" }]);

export {
    userColl,
    sessionColl,
};