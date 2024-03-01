import express from "express";

const app = express();

app.use(express.static("public"));

import path from "path";

app.get("/", (req, res) => {
    res.sendFile(path.resolve("public/homepage/homepage.html"));
});

const PORT = 8080;

app.listen(PORT, () => {console.log("003 DogTinder listening on PORT:", PORT)});