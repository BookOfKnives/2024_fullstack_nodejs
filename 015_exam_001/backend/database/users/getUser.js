import { userColl } from "../connection.js";

export async function getUser(user) {
    return await userColl.findOne({"user.username":user.name});
}
