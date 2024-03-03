import express from "express";
const app = express();
const PORT = 8080;

import path from "path";
app.use(express.static("public"))

import templateEngine from "./util/templateEngine.js";

const homepage = templateEngine.readPage("./public/pages/homepage/homepage.html");
const homepageRender = templateEngine.renderPage(homepage, {
    tabTitle: "Hans' Free Will Demo",
    cssLink: `<link rel="stylesheet" href="/components/css/main.css">`,
    jsLink: `<script src="/pages/homepage/homepage.js"></script>`,
});

const contact = templateEngine.readPage("./public/pages/contact/contact.html");
const contactRender = templateEngine.renderPage(contact, {
    tabTitle: "Contact",
    cssLink: `<link rel="stylesheet" href="/components/css/main.css">`,
    jsLink: `<script src="/pages/contact/contact.js"></script>`,
});


app.get("/", (req, res) => {
    res.send(homepageRender);
});

app.get("/contact", (req, res) => {
    res.send(contactRender);
});


app.listen(PORT, () => {
    console.log("Server 004 listening on port:", PORT);
});
