import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGO_URL);
console.log(1)
console.log(process.env.MONGO_URL)
let connection;
console.log(3)
try {
    console.log(2)
    connection = await client.connect();
    console.log(4)
} catch (err) {
    console.log(5)
    console.error("mongodb failure in connection.js, error:", err);
    console.log(6)
}
console.log(7)
const db = connection.db(process.env.MONGO_AUTH_DB);
console.log(8)

const userColl = db.collection("users");
console.log(9)

//test db insert below this
const date = new Date();
// userColl.deleteMany({});
// userColl.insertMany([{ "name": "hans", "password": "some shit" }, { "name": "re", "password":"re" }, { "name": "ho", "password": "alter" }, {"time of insert": date, "message":"have anice a day" }]);
console.log(10)

export {
    userColl
};