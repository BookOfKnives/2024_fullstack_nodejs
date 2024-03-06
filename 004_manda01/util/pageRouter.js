import express from "express";
const router = express.Router();

import fs from "fs";

function renderPage(pageURI, config={}) {
    const page = fs.readFileSync(pageURI).toString();
    const navbar = fs.readFileSync("./public/components/nav.html").toString()
                    .replace("$TAB_TITLE", config.tabTitle || "Hans' Demo of Free Will!")
                    .replace("$CSS_LINK", config.cssLink || `<link rel="stylesheet" href="../../components/css/main.css">`); 
    const footer = fs.readFileSync("./public/components/footer.html").toString()
                    .replace("$FOOTER_YEAR", `© ${new Date().getFullYear()}`)
                    .replace("$JS_LINK", config.jsLink || `<script src="/pages/homepage/homepage.js"></script>`);

    return navbar + page + footer;
};

const pageURI = "./public/pages/";
const pageCSS = `<link rel="stylesheet" href="/pages/`;
const pageJS = `<script src="/pages/`;
const pageMap = new Map();
pageMap.set("homepage", { page: pageURI + "/homepage/homepage.html", config: { tabTitle: "Home Page", } });
pageMap.set("contact", { page: pageURI + "/contact/contact.html", config: { tabTitle: "Contact", } });
pageMap.set("error_404", { page: pageURI + "/notfound/notfound.html", config: { tabTitle: "Page not found", } });
pageMap.set("learned", { page: pageURI + "/learned/learned.html", config: { tabTitle: "Learned Things", cssLink: pageCSS + `learned/learned.css">`, jsLink: pageJS + `learned/learned.js"></script>` } });
pageMap.set("jsvalues", { page: pageURI + "/jsvalues/jsvalues.html", config: { tabTitle: "JavaScript Values", } });
pageMap.set("npm", { page: pageURI + "/npm/npm.html", config: { tabTitle: "Node Package Manager", cssLink: pageCSS + `npm/npm.css">` } });

router.get("/:pageChoice", (req, res) => {
    const pageChoice = req.params.pageChoice;
    let page;
    if ( !pageMap.has(pageChoice) ) {
        page = renderPage( pageMap.get("error_404").page, pageMap.get("error_404").config, )
        res.status(404);
    } else {
        page = renderPage( pageMap.get(pageChoice).page, pageMap.get(pageChoice).config, )
    }
    res.send(page);
});

console.log("004 Page Router online.");

export default router;