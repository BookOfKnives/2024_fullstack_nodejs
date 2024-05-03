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

router.get("/api/sessions/destroy", (req, res) => {
    req.session.destroy();
    res.send({data: "session destroyed"});
})

console.log(startUpMessage);

export default router;