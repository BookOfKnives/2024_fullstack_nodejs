import fs from "fs";

function renderPage(pageURI, config={}) {
    const page = fs.readFileSync(pageURI).toString();
    const navbar = fs.readFileSync("./public/components/nav.html").toString()
                    .replace("$TAB_TITLE", config.tabTitle ?? "Hans' Demo of Free Will!")
                    .replace("$CSS_LINK", config.cssLink ?? ""); 
    const footer = fs.readFileSync("./public/components/footer.html").toString()
                    .replace("$JS_LINK", config.jsLink ?? `<script src="/pages/homepage/homepage.js"></script>`);
    return navbar + page + footer;
};

const pageURI = "./public/pages/"; //magiske ting ....
const pageCSS = `<link rel="stylesheet" href="/pages/`;
const pageJS = `<script src="/pages/`;
const pageJSEnd = `.js"></script>`

const homepageRender = renderPage( pageURI + "/homepage/homepage.html", { tabTitle: "Home Page", } );
const contactRender = renderPage( pageURI + "/contact/contact.html", { tabTitle: "Contact", } );
const errorNotFoundRender = renderPage( pageURI + "/notfound/notfound.html", { tabTitle: "Page not found", } );
const guestbookRender = renderPage( pageURI + "/guestbook/guestbook.html", { tabTitle: "Guest Book", jsLink: pageJS + `guestbook/guestbook` + pageJSEnd, } );
const learnedThingsRender = renderPage( pageURI + "/learned/learned.html", { tabTitle: "Learned Things", cssLink: pageCSS + `learned/learned.css">`, jsLink: pageJS + `learned/learned` + pageJSEnd, } );
//learned pages render
const jsValuesRender = renderPage( pageURI + "/jsvalues/jsvalues.html",  { tabTitle: "JavaScript Values", } );
const npmRender = renderPage( pageURI + "/npm/npm.html",  { tabTitle: "Node Package Manager", cssLink: pageCSS + `npm/npm.css">`, } );
const apiRender = renderPage( pageURI + "/api/api.html",  { tabTitle: "Express API server", } );
const promisesRender = renderPage( pageURI + "/promises/promises.html", { tabTitle: "Promises", });
const operatorRender = renderPage( pageURI + "/spreadoperator/spreadoperator.html", { tabTitle: "Spread Operator", });
const fakerRender = renderPage( pageURI + "/faker/faker.html", { tabTitle: "Faker Node package", jsLink: pageJS + `faker/faker` + pageJSEnd, } );

const pageMap = new Map();
pageMap.set("homepage", homepageRender );
pageMap.set("contact", contactRender );
pageMap.set("error_404", errorNotFoundRender );
pageMap.set("guestbook", guestbookRender );
pageMap.set("learned", learnedThingsRender );
//LEARNING pageroutes
pageMap.set("jsvalues", jsValuesRender );
pageMap.set("npm", npmRender );
pageMap.set("api", apiRender );
pageMap.set("promises", promisesRender );
pageMap.set("spreadoperator", operatorRender  );
pageMap.set("faker", fakerRender );

export { pageMap }
