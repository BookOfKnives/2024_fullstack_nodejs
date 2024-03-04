import express from "express";
const app = express();
const PORT = 8080;

import path from "path";
app.use(express.static("public"))

import pageRouter from "./util/pageRouter.js";

/*
const contact = templateEngine.readPage("./public/pages/contact/contact.html");
const contactRender = templateEngine.renderPage(contact, {
    tabTitle: "Contact",
    cssLink: `<link rel="stylesheet" href="/components/css/main.css">`,
    jsLink: `<script src="/pages/contact/contact.js"></script>`,
});
*/
/*
app.get("/contact", (req, res) => {
    res.send(contactRender);
});
*/

app.use("/pages", pageRouter);

app.listen(PORT, () => {
    console.log("Server 004 listening on port:", PORT);
});
