import "dotenv/config";

import passwordUtil from "../../util/password.js";
import { Router } from "express";
import { getUser } from "../../database/users/getUser.js";
import { createUser } from "../../database/users/createUser.js";
import { updateUserLastLogonTimeId } from "../../database/users/updateUser.js";
import mailer from "../../util/mailer.js";

const router = Router();
const startUpMessage = "Auth Router online.";

import newDataEntryIdNumber from "../../util/usersDatabaseUUID.js"; //TODO btyug UUIDs ist for
let highestUserIDNumber = newDataEntryIdNumber; //I cannot see how this would have any side-effects. *nervous laughing*

router.use(isAdmin);

router.post("/newusersignup", async (req, res) => {
    const data = req.body;

    const pw = await passwordUtil.hash(data.password)
    const newUser = {
        id: ++highestUserIDNumber.newIdNumber,
        username: data.name,
        password: pw,
        email: data.email,
        signUpDate: new Date().toLocaleString("da-DK", {timeZone: "Europe/Copenhagen"}),
        lastLogon: null, //TODO: brug login -- konssistent terminologi
    };
    try {
        await createUser(newUser);
    } catch (err) {
        console.error("authRouter newuserSignup error in createUser:", err);
    }
    try {
        const newUserEmail = newUser.email;
        mailer(newUserEmail); 
    } catch (err) {
        console.error("authRouter error in mailing, error:", err);
    }
    req.session.user = newUser;  
    res.status(200).send({ data: newUser }); //TODO bare send user
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
        req.session.user = dbLookup.user;
        let idNumber = dbLookup.user.id; 
        const newDate = new Date().toLocaleString("da-DK", {timeZone: "Europe/Copenhagen"});
        updateUserLastLogonTimeId(idNumber, newDate)
        res.status(200).send({ username: dbLookup.user.username }); //NB: this MUST send response.username back to login.svelte
    } else {
        res.status(403).send({ data: "unlawful password or username"});
    }
})

export function isAdmin(req, res, next) {
    let isAdmin = req.session?.role?.admin; //gives undefined if not
    let session = req.session;
    console.log("authRouter isAdmin being hit");
    console.log("isAdmin:", isAdmin);
    console.log("session:", session);
    //tjek om bruger har admin rolle i sin session
    //hvis ja, next ham -- ellers deny
    next();
}

console.log(startUpMessage);
export default router;