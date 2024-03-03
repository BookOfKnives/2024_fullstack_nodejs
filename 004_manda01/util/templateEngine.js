import fs from "fs";

function renderPage(page, config={}) {
    const navbar = fs.readFileSync("./public/components/nav.html").toString()
                    .replace("$TAB_TITLE", config.tabTitle || "Hans' Demo of Free Will!")
                    .replace("$CSS_LINK", config.cssLink || `<link rel="stylesheet" href="/components/css/main.css">`);
    const footer = fs.readFileSync("./public/components/footer.html").toString()
                    .replace("$FOOTER_YEAR", `© ${new Date().getFullYear()}`)
                    .replace("$JS_LINK", config.jsLink || `<script src="/pages/homepage/homepage.js"></script>`);

    return navbar + page + footer;
}

function readPage(pagePath) {
    return fs.readFileSync(pagePath).toString();
}

export default {
    renderPage,
    readPage,
};
