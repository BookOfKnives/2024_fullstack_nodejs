import express from "express";
import bcrypt from "bcrypt";
import session from "express-session";
// import { BCRYPT_SALT, BASE_URL } from "../stores/generalStore.js";
import "dotenv/config";

const router = express.Router();

router.use(express.json());

router.post("/authenticate", async (req, res) => {
    const loginData = req.body;
    // console.log("auth router input:", input); //giver  { username: 'ab', password: '123' }
    const verifyUserPostOptions = {
        method: "POST",
        headers: {
            "Content-Type":"application/json",
        },
        body: JSON.stringify(loginData),
    };
    const result = await fetch(BASE_URL + "api/users/findoneusername", verifyUserPostOptions)
        .then((response) => (response.json()));
    if ( result.data.username ) {
        const verifyPassword = await bcrypt.compare( loginData.password, result.data.passwordHash );
        //mangler at lave compare true  authentication
        req.session.userAuthorized = true;
        console.log("auth router req session:", req.session)
        res.send({ data: "User authorized." })
    }
        else {
        res.send({ data: "User not authorized." })
    }
});

router.post("/signup", async (req, res) => {
    const newUser = req.body;
    let passwordHash = await bcrypt.hash(newUser.newPassword, Number(process.env.SALT_ROUNDS));
    const doneUser = {
        username: newUser.newUsername,
        passwordHash: passwordHash
    };
    console.log("doneUser: is username and passwordHash?", doneUser)
    const signupApiFetchPostOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(doneUser)
    };
    let result;
    fetch(process.env.BASE_URL + "api/users",signupApiFetchPostOptions)
        .then((response) => (response.json()))
        .then((data) => (result = data))

    console.log( "signu result:", result);
    res.send({ data: result });
});

console.log("Auth Router online.");
export default router;