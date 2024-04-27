import { Router } from "express";
const router = Router();

router.get("/yes", (req, res) => {
    req.session.auth = true;
    res.send({ data: "Auth set OK!" });
})
router.get("/no", (req, res) => {
    req.session.auth = false;
    res.send({ data: "Auth set NOT!!OK!" });
})
router.get("/test", (req, res) =>{
    if (req.session.auth === true) { return res.sendFile(path.resolve("../frontend/dist/index.html")); }
    return res.status(403).send("illegal");
})


export default router;