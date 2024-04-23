import { Router } from "express";
const router = Router();

router.get("/api/customers", (req, res) => {
    res.send({ data })
})

router.post("/api/customers", (req, res) => {
    req.session.customerName = req.body.name;
    res.send({ data: `Welcome ${req.body.name}!` })
});

export default router;