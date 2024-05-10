import passwordUtil from "../../util/password.js";
import { Router } from "express";
import { createUser } from "../../database/users/createUser.js"
import { getUser } from "../../database/users/getUser.js";
import mailer from "../../util/mailer.js";

const router = Router();
const startUpMessage = "Auth Router online.";

import newDataEntryIdNumber from "../../util/usersDatabaseUUID.js";
let highestUserIDNumber = newDataEntryIdNumber; //I cannot see how this would have any side-effects. *nervously*

router.post("/newusersignup", async (req, res) => {
    const data = req.body;
    const pw = await passwordUtil.hash(data.password)
    const newUser = {
        id: ++highestUserIDNumber.newIdNumber,
        username: data.name,
        password: pw,
        email: data.email,
        signUpDate: new Date().toLocaleString("da-DK", {timeZone: "Europe/Copenhagen"}),
        lastLogon: null,
    };
    createUser(newUser);
    req.session.user = newUser;
    try {
        let newUserEmail = "hans079d@stud.kea.dk";
        mailer(newUserEmail) 
    } catch (err) {
        console.error("authRouter error in mailing, error:", err);
    }
    res.status(200).send({ data: newUser });
    
});

router.post("/login", async (req, res) => {
    const signInattempt = req.body;

    let dbLookup;
    try {
        dbLookup = await getUser(req.body);
    } catch (err) {
        console.error("login in authRouter gives error on dbLookUp, error:", err);
    }

    let pwCheck = false;
    try {
        pwCheck = await passwordUtil.compare(signInattempt.password, dbLookup.user.password);
    } catch (err) {
        console.error("pwcheck in authRouter gives error on pwCheck, error:", err);
    }
    if (pwCheck) { 
        req.session.userAuthenticated = true;
        req.session.userName = signInattempt.name;
        res.status(200).send({ username: signInattempt.name })
    } else {
        res.status(403).send({ data: "unlawful password or username"});
    }
})

console.log(startUpMessage);
export default router;