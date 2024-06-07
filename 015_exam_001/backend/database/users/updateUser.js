import { userColl } from "../connection.js";

export async function updateUserLastLogonTimeId(id, time) { //TODO: remove console logs here
    let result = await userColl.updateOne({"user.id":id}, {$set: {"user.lastLogon": time}} )
    // console.log("updateuserlastlogontime, result:", result);
    return result;
}

export async function updateUserEmail(id, email) { //TODO -- consider to remove if patch works
    return result = await userColl.updateOne({"user.id":id}, {$set: {"user.email": email}});
    // console.log("update email result:", result);
    
}

export async function patchUser(id, userPatchData) { //TODO test that this replaces the user data in the db
    return result = await userColl.replaceOne({"user.id":id}, {$set: {"user": userPatchData}});
    // console.log("pathchuser in updateUIser js", result);
    // db.coll.replaceOne({"name": "Max"}, {"firstname": "Maxime", "surname": "Beugnet"})

}