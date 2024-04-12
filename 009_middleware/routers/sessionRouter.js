import { Router } from "express";

const router = Router();

router.get("/definesecretmessage", (req, res) => {
    const secretMessage = req.query.secretMessage;

    if (secretMessage) {
        res.send({ message: `you have defined secret message as: ${secretMessage}`});
    } else { res.send({ message: "you have NOt defined message" }) };
});

export default router;