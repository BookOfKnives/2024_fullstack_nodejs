import express from "express";
import path from "path";
import pageRouter from "./util/pageRouter.js";
import commentsApiRouter from "./api/comments/commentsapirouter.js"

const PORT = 8080;
const app = express();

app.use(express.static("public"))
app.use("/pages", pageRouter);

app.use("/api/comments/", commentsApiRouter);

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
