import { Router } from "express";
const router = Router();

function isAdmin(req, res, next) {
    req.isAdmin = true;
    next();
}

router.get("/lockedRoom", isAdmin, (req, res) => {
    res.send({ message: "youre in a locked room bub!" })
});

export default router;