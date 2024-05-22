let debug = process.argv.includes("debug");

import passwordUtil from "../../util/password.js";
import { Router } from "express";
import { createUser } from "../../database/users/createUser.js"
import { getUser } from "../../database/users/getUser.js";
import mailer from "../../util/mailer.js";
import { cl, cle } from "../../util/logger.js";

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
    createUser(newUser); //egegntlig bør authRouter IKKE lave ting -- den bør sende det til userApi
    req.session.user = newUser; //det her bør også sendes til sessionRouter
    try {
        let newUserEmail = newUser.email;
        mailer(newUserEmail) 
    } catch (err) {
        cle(err, "authRouter error in mailing, error:");
    }
    res.status(200).send({ data: newUser });
    
});

router.post("/login", async (req, res) => {
    const signInattempt = req.body;

    let dbLookup;
    try {
        dbLookup = await getUser(req.body);
    } catch (err) {
        cle(err, "login in authRouter gives error on dbLookUp, error:");
    }
    if (debug) { console.log(dbLookup) }
    let pwCheck = false;
    try {
        pwCheck = await passwordUtil.compare(signInattempt.password, dbLookup.user.password);
    } catch (err) {
        cle(err, "pwcheck in authRouter gives error on pwCheck, error:");
    }
    if (pwCheck) { 
        req.session.user = dbLookup;
        res.status(200).send({ username: dbLookup.user.username })
    } else {
        res.status(403).send({ data: "unlawful password or username"});
    }
})

console.log(startUpMessage);
export default router;