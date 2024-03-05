import express from "express";
const app = express();
const PORT = 8080;

app.use(express.static("public"))

import pageRouter from "./util/pageRouter.js";

app.use("/pages", pageRouter);

app.get("/", (req, res) => {
    res.redirect("/pages/homepage");
})

const statsData = {
    numberOfVisitors: 0,
}

app.listen(PORT, () => {
    console.log("Server 004 listening on port:", PORT);
});
