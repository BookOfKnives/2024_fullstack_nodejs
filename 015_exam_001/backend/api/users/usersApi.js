let debug = process.argv.includes("debug");

import { Router } from "express";
const router = Router();
const startUpMessage = "Users API Router online.";
const routerUrl = "/api/users";

import { isAdmin } from "../../routers/auth/authRouter.js";

import passwordUtil from "../../util/password.js";
import { createUser } from "../../database/users/createUser.js";
import { getAllUsers } from "../../database/users/getAllUsers.js";
import { patchUser } from "../../database/users/updateUser.js";
import { getOneUser } from "../../database/users/getOneUser.js";
import { deleteUser } from "../../database/users/deleteUser.js";

/*
 const user = {
    name: ...
    password: ...
    email: ...
    signUpDate: ...
    lastLogon: ...
    id: ...
 }
*/
router.use(isAdmin);

router.get(routerUrl, async (req, res) => {
    const data = await getAllUsers();
    res.send({ data })
});
router.get(routerUrl + "/:idnumber", async (req, res) => {
    let idNumber = Number(req.params.idnumber);
    let result = await getOneUser(idNumber);
    if (result) res.send({data: result})
    else res.status(404).send({data: "User not found!"});
});

router.post(routerUrl, (req, res) => {
    const user = req.body;
    if (debug) { console.log("usersApi RouterPost says, USER from req.body:", user); }
    /*
    usersApi RouterPost says, USER from req.body: {
  id: 7,
  username: 'ghghjghj',
  password: '$2b$14$G6N.6HsggpLMAUYrlZcmFusHigrn7dqfIXWDpMuiRMMmRAIoiSOIi',
  email: 're@re.re',
  signUpDate: '30.5.2024 15.48.36',
  lastLogon: null
}
    */
   try {
       createUser(user);
   } catch (err) {
    console.error("userApi cannot create user, error:", err);
   }
    res.send({user});
});

router.patch(routerUrl + "/:idnumber", async (req, res) => {
    const idNumber = Number(req.params.idnumber);
    const userFromReq = req.body;
    let userFromDb = await getOneUser(idNumber);
    userFromReq.username ? userFromDb.username = userFromReq.username : userFromDb.username;
    userFromReq.password ? userFromDb.password = passwordUtil.hash(userFromReq.password) : userFromDb.password;
    userFromReq.email ? userFromDb.email = userFromReq.email : userFromDb.email;
    let result = await patchUser(userFromDb, idNumber);
    res.status(200).send({data: result});
});

router.delete(routerUrl + "/:idnumber", async (req, res) => {
    const idNumber = Number(req.params.idnumber);
    const result = await deleteUser(idNumber);
    res.send({data: result});
});

export default router;
console.log(startUpMessage);
