import {MongoClient} from "mongodb";
const URL = "mongodb://localhost:27017";
const client = new MongoClient(URL);

const dbname = "icecreams";

await client.connect();

const db = client.connect("icecream");

export default {
    types: db.collection("types"),
    brands: db.collection("brands"),
}