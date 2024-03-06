import express from "express";
const app = express();
const PORT = 8080;

import path from "path";

app.use(express.static("public"))

import pageRouter from "./util/pageRouter.js";

app.use("/pages", pageRouter);

app.get("/", (req, res) => {
    res.status(301).redirect("/pages/homepage");
})

app.get('/favicon.ico', (req, res) =>{
    res.sendFile(path.resolve("./public/components/img/durandal_logo.png"));
});


const statsData = {
    numberOfVisitors: 0,
}

app.listen(PORT, () => {
    console.log("Server 004 listening on port:", PORT);
});
