import fs from "fs";

function renderPage(page, config={}) {
    const navbar = fs.readFileSync("./public/components/nav.html").toString()
                    .replace("$TAB_TITLE", config.tabTitle || "Upper")
                    .replace("$CSS_LINK", config.cssLink || "");
    const footer = fs.readFileSync("./public/components/footer.html").toString()
                    .replace("$FOOTER_YEAR", `© ${new Date().getFullYear()}`);

    return navbar + page + footer;
}

function readPage(pagePath) {
    return fs.readFileSync(pagePath).toString();
}

export default {
    renderPage,
    readPage,
};
