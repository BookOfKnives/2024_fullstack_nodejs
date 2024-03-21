import express from "express";
const PORT = 8080;
const app = express();
app.use(express.static("public"))

import path from "path";

import pageRouter from "./util/pageRouter.js";
app.use(pageRouter);
import commentsApiRouter from "./api/comments/commentsapirouter.js"
app.use(commentsApiRouter);
import { fakerRouter } from "./util/faker.js";
app.use(fakerRouter);

// let fakerConObj = {
//     foo: "1",
//     bar: 2,
// }

// fakerConfig(fakerConObj)

// commentsApiRouter.getConfig(someshit={})

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
