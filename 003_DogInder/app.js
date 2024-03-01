import express from "express";

const app = express();

app.use(express.static("public"));

import path from "path";

import getMatches from "./public/pages/matches/matches.js";

app.get("/", (req, res) => {
    res.sendFile(path.resolve("public/pages/homepage/homepage.html"));
});
app.get("/proxy", (req, res) => {
    fetch("https://www.google.com")
    .then(response => response.text())
    .then(result => res.send(result));
});

app.get("/matches", (req, res) => {
    res.sendFile(path.resolve("public/pages/matches/matches.html"));
})

app.get("/contact", (req, res) => {
    res.sendFile(path.resolve("public/pages/contact/contact.html"));
})

//=======API

app.get("/api/matches", async (req, res) => {
    const matches = getMatches();
    res.send({ data: matches });
});

const PORT = 8080;

app.listen(PORT, () => {console.log("003 DogTinder listening on PORT:", PORT)});