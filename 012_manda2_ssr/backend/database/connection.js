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

const test = db.collection("test_db_mongo_012");
console.log(9)
// await test.insertMany([{ a: 1 }, { a: 2 }, { a: 3 }]);
console.log(10)

export default test;