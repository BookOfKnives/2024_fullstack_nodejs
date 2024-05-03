import { userColl } from "../connection.js";

async function createUser(user) {
    userColl.insertOne({user});
    return 1;
}

export default createUser;

