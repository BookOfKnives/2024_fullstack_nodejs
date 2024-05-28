import { userColl } from "../connection.js";

export async function getOneUser(id) {
    return await userColl.findOne({"user.id":id});
}
