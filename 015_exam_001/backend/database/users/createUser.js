import { userColl } from "../connection.js";

export async function createUser(user) {
    return await userColl.insertOne({user});
    
}