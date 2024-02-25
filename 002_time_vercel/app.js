const express = require("express");
const app = express();

const PORT = 8080;

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/homepage/homepage.html")
})

app.get("/1", (req, res) => {
    res.send({ data: "welcome to 002, time. "})
});

app.listen(PORT, () => {console.log("002 time vercel server listening on port:", PORT)});

module.exports = app;