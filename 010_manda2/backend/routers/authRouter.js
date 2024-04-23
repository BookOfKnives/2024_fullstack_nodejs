import express from "express";
import bcrypt from "bcrypt";
import session from "express-session";
// import { BCRYPT_SALT, BASE_URL } from "../stores/generalStore.js";
import "dotenv/config";

const router = express.Router();

router.use(express.json());

router.post("/authenticate", async (req, res) => {
    const loginData = req.body;

    console.log("sess id authenticate:", req.session.id)
    const verifyUserPostOptions = {
        method: "POST",
        credentials: "include", //til brug for at få session stil at virke?
        headers: {
            "Content-Type":"application/json",
        },
        body: JSON.stringify(loginData), //sender hele brugeren her, ...?måske? skal jo bruge pass også
    };
    const result = await fetch(process.env.BASE_URL + "api/users/findoneusername", verifyUserPostOptions)
        .then((response) => (response.json()));
    if ( !result.data.username ) {
        res.send({ data: "User not authenticated. "})
    } else {
        const verifyPassword = await bcrypt.compare( loginData.password, result.data.passwordHash );
        if ( !verifyPassword ) {
            res.send({ data: "User not authenticated." });
        } else {
            req.session.userData = {
                name: result.data.username
            }  //set the user name proper. 
        };

        res.send({ data: "User authenticated." });
        }
    }
);

router.post("/signup", async (req, res) => {
    const newUser = req.body;
    if ( !newUser.newUsername || !newUser.newPassword ) {
        res.send({ data: "error, cannot create user." });
    } else {
        const salt = Number(process.env.SALT_ROUNDS);
        bcrypt.hash(newUser.newPassword, salt, async function(err, hash) {
            if (err) {
                console.error("hashing failed in auth router signup", err);
                //brug toast her
                res.send({ data: "Cannot sign up, error", err});
            }
            else {
                const doneUser = {
                    username: newUser.newUsername,
                    passwordHash: hash
                };
                const signupApiFetchPostOptions = {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(doneUser),
                };
                let result = await fetch(process.env.BASE_URL + "api/users", signupApiFetchPostOptions)
                    .then((response) => (response.json()))
                    .catch((err) => ( res.send({ data: err }) ) );
                res.send({ data: "New user created! Name: " + result.data.username });
            } 
        });
    }
});

// session test
/*
router.get("/authSession", (req, res) => {
    const data = req.session;
    console.log("authsess name: authsession", req.session.name)
    console.log("authsess id: authsession", req.session.id)
    res.send({ data });
});

router.get("/authz", (req, res) => {
    req.session.name = "hans" 
    console.log("sess id authz:", req.session.id)
    res.send({ data: "ok" })
});

router.post("/authz", (req, res) => {
    req.session.name = "hans" 
    res.send({ data: "ok" })
});

router.get('/authnum', function(req, res, next) {
    if (req.session.views) {
      req.session.views++
      res.setHeader('Content-Type', 'text/html')
      res.write('<p>views: ' + req.session.views + '</p>')
      res.write('<p>views: ' + req.session.name + '</p>')
      res.write('<p>expires in: ' + (req.session.cookie.maxAge / 1000) + 's</p>')
      res.end()
    } else {
      req.session.views = 1
      res.end('welcome to the session demo. refresh!')
    }
  })
*/
// session test end

console.log("Auth Router online.");
export default router;