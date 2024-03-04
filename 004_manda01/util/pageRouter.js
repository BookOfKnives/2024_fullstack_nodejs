//i want this to handle all the page stuff, same way I want the api.js to handle the api stuff.
import express from "express";
const router = express.Router();

import path from "path";
import fs from "fs";

function renderPage(pageURI, config={}) {
    const page = fs.readFileSync(pageURI).toString();
    const navbar = fs.readFileSync("./public/components/nav.html").toString()
                    .replace("$TAB_TITLE", config.tabTitle || "Hans' Demo of Free Will!")
                    .replace("$CSS_LINK", config.cssLink || `<link rel="stylesheet" href="/components/css/main.css">`);
    const footer = fs.readFileSync("./public/components/footer.html").toString()
                    .replace("$FOOTER_YEAR", `© ${new Date().getFullYear()}`)
                    .replace("$JS_LINK", config.jsLink || `<script src="/pages/homepage/homepage.js"></script>`);

    return navbar + page + footer;
};

const pageMap = new Map();
pageMap.set("homepage", "./public/pages/homepage/homepage.html");
pageMap.set("contact", "./public/pages/contact/contact.html"); //sklal lige finde ud af hvordan jeg får contact.js ind i den.


const homepageRender = renderPage("./public/pages/homepage/homepage.html", {
    tabTitle: "Hans' Free Will Demo",
    // cssLink: `<link rel="stylesheet" href="/components/css/main.css">`,
    // jsLink: `<script src="/pages/homepage/homepage.js"></script>`,
});

// router.get("/home", (req, res) => {
//     res.send(homepageRender)
// });

router.get("/:pageChoice", (req, res) => {
    const pageChoice = req.params.pageChoice;
    const page = renderPage(pageMap.get(pageChoice))
    res.send(page);
});

console.log("004 Page Router online.");

export default router;

