import { userColl } from "../connection.js";

async function getUser(user) {
    return await userColl.findOne({"user.username":user.name});
}

export default getUser;

