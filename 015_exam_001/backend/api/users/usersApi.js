let debug = process.argv.includes("debug");
import { cl } from "../../util/logger.js";

import { Router } from "express";
const router = Router();
const startUpMessage = "Users API Router online.";

const routerUrl = "/api/users";

import passwordUtil from "../../util/password.js";
import { createUser } from "../../database/users/createUser.js";
import { getAllUsers } from "../../database/users/getAllUsers.js";
import { updateUserLastLogonTimeId, patchUser } from "../../database/users/updateUser.js";
import { getOneUser } from "../../database/users/getOneUser.js";
import { getUser } from "../../database/users/getUser.js";

/*
 const user = {
    name: ...
    password: ...
    email: ...
    signUpDate: ...
    lastLogon: ...
    id: ...
 }
*/

router.get(routerUrl, async (req, res) => {
    const data = await getAllUsers();
    res.send({ data })
});
//er det her sikkert? altså, enhver kan jo tilgå dem (fra lokal host)
//jeg skal bruge next til at gøre det, yes? 2805 2024
//kan jeg have en permission som KUN min frontend server har? lige nu tjekker jeg jo kun payload
router.get(routerUrl + "/:idnumber", async (req, res) => {
    let idNumber = Number(req.params.idnumber);
    let result = await getOneUser(idNumber);
    if (result) res.send({data: result})
    else res.status(404).send({data: "User not found!"});
});

router.get(routerUrl + "/:idnumber", async (req, res) => {
    let idNumber = Number(req.params.idnumber);
    let result = await getOneUser(idNumber);
    if (result) res.send({data: result})
    else res.status(404).send({data: "User not found!"});
})

router.post(routerUrl, (req, res) => {
    const user = req.body;
    if (debug) { cl("usersApi RouterPost says, USER from req.body:", user); }
    createUser(user);
    res.send({data: user});
});

router.patch(routerUrl + "/:idnumber/updateuserlastlogon", (req, res) => {
    const idNumber = Number(req.params.idnumber); //bad way to do it. Should check the session for user id.
    console.log("user api patch idnumber last logon update, has session?", req.session)
    const newDate = new Date().toLocaleString("da-DK", {timeZone: "Europe/Copenhagen"}); //TODO dont have the changin code here, only the routing -- chainging code should be in updateUser.js
    let result = updateUserLastLogonTimeId(idNumber, newDate);
    console.log("result of update last logon time in userapi:", result)
    res.status(200).send({data: result});
});

router.patch(routerUrl + "/:idnumber", async (req, res) => {
    const idNumber = Number(req.params.idnumber);
    const userFromReq = req.body;
    let userFromDb = await getOneUser(idNumber);
    userFromReq.username ? userFromDb.username = userFromReq.username : userFromDb.username;
    userFromReq.password ? userFromDb.password = passwordUtil.hash(userFromReq.password) : userFromDb.password;
    userFromReq.email ? userFromDb.email = userFromReq.email : userFromDb.email;
    let result = await patchUser(userFromDb, idNumber);
    res.status(200).send({data: result});
});

// router.patch(routerUrl, + "/:idnumber", (req, res) => { //TODO delete etc
//     res.send({data: "OK"})
// } )

export default router;

console.log(startUpMessage);
