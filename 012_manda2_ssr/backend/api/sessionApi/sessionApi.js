import { Router } from "express";
const router = Router();

const startUpMessage = "Session API Router online.";

router.get("/api/sessions", (req, res) => {
    const sess = req.session;
    res.send({ data: sess });
});

router.get("/api/sessions/getname", (req, res) => {
    const { userAuthenticated, userName } = req.session;
    res.send({ data: { userAuthenticated, userName }});
});

//test path for setting cookies
router.get("/api/sessions/set", (req, res) => {
    req.session.testSet = "I am a set test session cookie! from api session set";
    res.send({ data: "api sessions set has set req.session.testSet"});
});

router.get("/api/sessions/destroy", (req, res) => {
    req.session.destroy();
    res.send({data: "sess destroyed"});
})

console.log(startUpMessage);
export default router;