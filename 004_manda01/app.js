import express from "express";
const app = express();
const PORT = 8080;

app.use(express.static("public"))

import pageRouter from "./util/pageRouter.js";

app.use("/pages", pageRouter);

app.listen(PORT, () => {
    console.log("Server 004 listening on port:", PORT);
});
