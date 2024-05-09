import { Router } from "express";
const router = Router();

import db from "../database/connection.js";

router.get("/api/volcanoes", async (req, res) => {
    const results = await db.all("SELECT * FROM volcanoes")
    res.send({ data: results });
});

router.post("/api/volcanoes", async (req, res) => {
    const { name, isActive, type } = req.body;

    if (!name) {
        return res.status(400).send("no name in body");
    }

    if (isActive === undefined || isActive === null) {
        return res.status(400).send("no isActive in body");
    }

    if (!type) {
       return res.status(400).send("no type in body");
    }
    // const result = await db.run(`INSERT INTO volcanoes (name, is_active, type) VALUES (${name}, ${isActive}, ${type})`); //dårligt fordi det giver sql injection
    const result = await db.run(`INSERT INTO volcanoes (name, is_active, type) VALUES (?, ?, ?)`, [name, isActive, type]); //giver indbygget sanitering
    res.send({ lastId: result.lastID });
});
//hvis man definerer alle columns kan man undlade (columns i parentes)
//men det kan man ikke hvis man har autoincrement? tror jeg

export default router;