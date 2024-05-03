import passwordMaker from "../util/password.js";
import { Router } from "express";
import createUser from "../database/userdb/createUser.js";
const router = Router();

router.post("/newusersignup", async (req, res) => {
    const data = req.body;
    console.log("01 data", data);
    const pw = await passwordMaker.makeNewPassword(data.password)
    const newUser = {
        username: data.name,
        password: pw,
    };
    console.log("02 new user signup in authrRouter, new user? should have hashedPW", newUser);
    // console.log("this is new users sign up authRouter, new user data:", data);
    //fetch post to user db api
    createUser(newUser);
    res.send("heya from newuserseignsup");

});

export default router;