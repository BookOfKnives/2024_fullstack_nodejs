import express from "express";
const app = express();
const PORT = 8080;

import path from "path";
app.use(express.static("public"))

import templateEngine from "./util/templateEngine.js";

const homepage = templateEngine.readPage("./public/pages/homepage/homepage.html");
const homepageRender = templateEngine.renderPage(homepage, {
    tabTitle: "Hans' Free Will Demo",
});


app.get("/", (req, res) => {
    res.send(homepageRender);
});

app.listen(PORT, () => {
    console.log("Server 004 listening on port:", PORT);
});
