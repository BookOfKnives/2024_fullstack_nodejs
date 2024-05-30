let debug = process.argv.includes("debug");
import "dotenv/config";
const BASE_URL = process.env.BASE_URL;

import passwordUtil from "../../util/password.js";
import { Router } from "express";
import { getUser } from "../../database/users/getUser.js";
import mailer from "../../util/mailer.js";
import { cl, cle } from "../../util/logger.js";
import { fetchPatch, fetchPatchNoData, fetchPost, fetchGet } from "../../util/fetchUtil.js";

const router = Router();
const startUpMessage = "Auth Router online.";

import newDataEntryIdNumber from "../../util/usersDatabaseUUID.js";
let highestUserIDNumber = newDataEntryIdNumber; //I cannot see how this would have any side-effects. *nervous laughing*

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
    
    // await fetchPost(newUser, BASE_URL + "/api/users/");
    await fetchPost("http://localhost:8080/api/users/", newUser);

    req.session.user = newUser;
    try {
        let newUserEmail = newUser.email;
        mailer(newUserEmail) 
    } catch (err) {
        cle(err, "authRouter error in mailing, error:");
    }
    req.session.user = newUser; //try this 3005 
    res.status(200).send({ data: newUser });
    
});

router.post("/login", async (req, res) => {
    const signInattempt = req.body;
    let dbLookup;
    try {
        dbLookup = await getUser(req.body); //TODO replace this direct call to db with a fetch to userapi
    } catch (err) {
        cle(err, "login in authRouter gives error on dbLookUp, error:");
    }
    let pwCheck = false;
    try {
        pwCheck = await passwordUtil.compare(signInattempt.password, dbLookup.user.password);
    } catch (err) {
        cle(err, "pwcheck in authRouter gives error on pwCheck, error:");
    }
    if (pwCheck) { 
        req.session.user = dbLookup.user;
        let idNumber = dbLookup.user.id; 
        let resultOfFetch = await fetchPatchNoData(BASE_URL + "api/users/" + idNumber + "/updateuserlastlogon");
        res.status(200).send({ username: dbLookup.user.username }); //NB: this MUST send response.username back to login.svelte
    } else {
        res.status(403).send({ data: "unlawful password or username"});
    }
})

console.log(startUpMessage);
export default router;