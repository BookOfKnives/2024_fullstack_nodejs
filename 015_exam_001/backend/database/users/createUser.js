import { userColl } from "../connection.js";

export async function createUser(user) {
    userColl.insertOne({user});
    return 1;
}