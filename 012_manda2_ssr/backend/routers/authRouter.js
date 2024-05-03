import passwordUtil from "../util/password.js";
import { Router } from "express";
import createUser from "../database/userdb/createUser.js";
import getUser from "../database/userdb/getUser.js";
import mailer from "../util/mailer.js";

const router = Router();

const startUpMessage = "Auth Router online.";

router.post("/newusersignup", async (req, res) => {
    const data = req.body;
    const pw = await passwordUtil.makeNewPassword(data.password)
    const newUser = {
        username: data.name,
        password: pw,
    };
    createUser(newUser);
    req.session.user = newUser;
    let newUserEmail = "someguys@thestuff.dk";
    //mailer(newUserEmail) // kan ikke køre denne uden en Haraka Server -- npm i Haraka, node ./haraka.js
    res.status(200).send({ data: newUser });
});

router.post("/login", async (req, res) => {
    const signInattempt = req.body;
    const dbLookup = await getUser(req.body);
    const pwCheck = await passwordUtil.verifyPassword(signInattempt.password, dbLookup.user.password);
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