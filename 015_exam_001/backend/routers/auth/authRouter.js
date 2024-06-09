import "dotenv/config";

const PUBLIC_KEY = process.env.PUBLIC_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

import passwordUtil from "../../util/password.js";
import { Router } from "express";
import { getUser } from "../../database/users/getUser.js";
import { createUser } from "../../database/users/createUser.js";
import { updateUserLastLoginTimeId } from "../../database/users/updateUser.js";
import mailer from "../../util/mailer.js";
import { myLogger as l } from "../../util/logger.js";
import jwt from "jsonwebtoken";
import path from "path";

const router = Router();
const startUpMessage = "Auth Router online.";

import newDataEntryIdNumber from "../../util/usersDatabaseUUID.js"; //TODO btyug UUIDs ist for
let highestUserIDNumber = newDataEntryIdNumber; //I cannot see how this would have any side-effects. *nervous laughing*

// router.use(isAdmin); //TODO is this the right place for admin?? 0706

router.get("/", async (req, res, next) => {
    l.dl();
    l.cll("authrouter 015 hit");
    // let jwToken = await jwt.sign( { balls: "mine" }, PRIVATE_KEY, { algorithm: "RS256", expiresIn: '5m' } );
    // req.session.jwToken = jwToken;
    // let verify = await jwt.verify(jwToken, PUBLIC_KEY, { algorithm: "RS256" } );
    // l.cll("verify?", verify || null);
    l.cll("auth / sessiopn?", req.session);
    if (req.session.jwToken) {
        l.dl();
        l.cll("inside jwtotnw in authourter /, nexting"); 
        next(); }
    else {
        l.dl();
        l.cll("inside ELSE in authourter after jwt /, serving login"); 
        res.sendFile(path.resolve("./public/login.html"));
    }
    // else { res.send("authrouter 015 gopod luck!"); }
    // res.send("authrouter 015 gopod luck!"); 
});

router.get("/publickey", (req, res) => {
    l.dl();
    l.cll("publickey in authrouter HIT")
    res.send(JSON.stringify(PUBLIC_KEY));
})

export function isAdmin(req, res, next) {
    l.dl();
    l.cll("isAdmin funciont in authrouiter HIT")
    const token = req.session?.token;
    let tokenVerified;
    if (token) {
        l.dl();
        l.cll("isAdmin lookup, tokenVerified? 01");
        tokenVerified = jwt.verify(token, PUBLIC_KEY, { algorithm: "RS256" });
        l.cll("token:", tokenVerified);
    }
    if (tokenVerified.roles.includes("admin")) { 
        l.dl();
        l.cll("isAdmin lookup, tokenVerified? 02");
        next(); 
    }
    else { res.status(403).send("forbidden, unlawful role for access.") }


}

router.post("/newusersignup", async (req, res) => { 
    l.dl();
    l.cll("newuserisgnup in Authrouert HIT")
    const data = req.body;

    let badInput = false;
    if (!data.name) badInput = true;
    if (!data.password) badInput = true;
    if (!data.email) badInput = true;
    if (badInput) res.status(403).send("bad input");

    const pw = await passwordUtil.hash(data.password)
    const newUser = {
        id: ++highestUserIDNumber.newIdNumber,
        username: data.name,
        password: pw,
        email: data.email,
        signUpDate: new Date().toLocaleString("da-DK", {timeZone: "Europe/Copenhagen"}),
        lastLogin: null, 
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
    req.session.user = newUser;// TODO skal bare være token  
    // res.status(200).send({ data: newUser });
    res.status(200).send({username: newUser.username }); 
});

router.post("/login", async (req, res) => { //this expects { name: "somename", password: "somepassword" };
    l.dl();
    l.cll("in login in authrouter being hit, req.body:", req.body)
    const signInattempt = req.body;
    let dbLookup;
    try {
        dbLookup = await getUser(req.body); 
        l.dl();
        l.cll("dblookup in login, found?", dbLookup);
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
        const idNumber = dbLookup.user.id; 
        const newDate = new Date().toLocaleString("da-DK", {timeZone: "Europe/Copenhagen"});
        updateUserLastLoginTimeId(idNumber, newDate);
        const token = await jwt.sign( { balls: "mine" }, PRIVATE_KEY, { algorithm: "RS256", expiresIn: '5m' } );
        req.session.token = token;
        res.status(200).send({ token }); 
    } else {
        res.status(403).send("unlawful password or username");
    }
})

console.log(startUpMessage);
export default router;