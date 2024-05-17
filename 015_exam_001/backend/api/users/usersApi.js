let debug = process.argv.includes("debug");
import { cl } from "../../util/logger.js";

import { Router } from "express";
const router = Router();
const startUpMessage = "Users API Router online.";

const routerUrl = "/api/users";

import {createUser} from "../../database/users/createUser.js";
import {getAllUsers} from "../../database/users/getAllUsers.js";
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

router.post(routerUrl, (req, res) => {
    const user = req.body;
    if (debug) { cl("usersApi RouterPost says, USER from req.body:", user); }
    createUser(user);
    res.send("user api router post somsome user")
});

export default router;

console.log(startUpMessage);
