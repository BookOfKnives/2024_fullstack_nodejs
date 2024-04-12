import { Router } from "express";
const router = Router();

const messages = [];

router.get("/messages", (req, res) => {
    res.send({ data: messages });
});



export default router;