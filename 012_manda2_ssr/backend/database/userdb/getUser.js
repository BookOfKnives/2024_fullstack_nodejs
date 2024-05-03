import { userColl } from "../connection.js";

async function getUser(user) {
    const data = await userColl.findOne({"user.username":user.name});
    console.log("getuser has fdound?", data);
    return data;
}

export default getUser;

