import express from "express";
const app = express();

import volcanoesRouter from "./routers/volcanoRouter.js";

app.use(express.json());

app.use(volcanoesRouter);

app.get("/", (req, res) => {
    res.send("hello");
});

const PORT = 8080;
app.listen(PORT, console.log("012 Volcano server app listening on port:", PORT));
