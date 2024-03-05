import express from "express";
const router = express.Router();

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

const pagesPublicString = "./public/pages/";
const pageMap = new Map();
pageMap.set("homepage", { page: pagesPublicString + "/homepage/homepage.html", });
pageMap.set("contact", { page: pagesPublicString + "/contact/contact.html", });
pageMap.set("error_404", { page: pagesPublicString + "/notfound/notfound.html", });

router.get("/:pageChoice", (req, res) => {
    const pageChoice = req.params.pageChoice;
    if ( !pageMap.has(pageChoice) ) {
        const page = renderPage( pageMap.get("error_404").page, pageMap.get("error_404").config, )
        res.status(404).send(page);
        return 0;
    }
    const page = renderPage( pageMap.get(pageChoice).page, pageMap.get(pageChoice).config, )
    res.send(page);
});

console.log("004 Page Router online.");

export default router;