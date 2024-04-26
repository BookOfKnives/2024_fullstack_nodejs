import "dotenv/config";
import express from "express";
const app = express();

app.use(express.json());

import path from "path";
app.use(express.static(path.resolve("./public/loginpage")));
app.use(express.static(path.resolve("../frontend/dist")));

import mongoStore from "connect-mongo";

import session from "express-session";
app.use(session({
    secret: process.env.SESSION_SECRET,
    store: mongoStore.create({
        mongoUrl: process.env.MONGO_URL,
        dbName: process.env.MONGO_AUTH_DB,
    }),
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
}));


// import test from "./database/connection.js";

app.get("/frontpage", (req, res) => {
    console.log("app 012 get *: req.session", req.session);
    if (req.session.isUsedLoggedIn) { 
        console.log("inside if")
        return res.sendFile(path.resolve('../frontend/dist/index.html')); 
    }
    console.log("outside if")
    return res.status(403).send({ data: "some shit" });
});

app.get("/authSessionTest", (req, res) => {
    req.session.auth = true;
    res.send({ data: "Auth set OK!" });
})

app.get("/authLoginTest", (req, res) =>{
    if (req.session.auth === true) { return res.sendFile(path.resolve("../frontend/dist/index.html")); }
    return res.status(403).send("illegal");
})

const dateOptions = { 
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
};
const serverStartTime = Intl.DateTimeFormat(undefined, dateOptions).format(new Date());

const PORT = process.env.PORT ?? 8080;
app.listen(PORT, () => {
    console.log(`App Server 012 Manda2 running on PORT: ${PORT}, started at TIME: ${serverStartTime}.`)
}); 