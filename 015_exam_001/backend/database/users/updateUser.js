import { userColl } from "../connection.js";

export async function updateUserLastLogonTime(user, time) {
    // let userTemp = await userColl.findOne({"user.username":user.name});
    //user updateONe{}
    let result = await userColl.updateOne({"user.username":user.name}, {$set: {"user.lastLogon": time}} )
    console.log("updateuserlastlogontime, result:", result);
    //hvad er syntaks for at ændre noget?
    // userTemp.lastLogon = time;
    //nej ... jeg skal jo modifere den -- så jeg skal have DML
    return "OK in updatelastuserlogontime";
}
