import passwordMaker from "../util/password.js";
import { Router } from "express";

const router = Router();

router.post("/newusersignup", (req, res) => {
    const data = req.body;
    console.log("this is new users sign up authRouter, new user data:", data);
    res.send("heya from newuserseignsup");
});

export default router;