import 'dotenv/config'
//import dotenv from "dotenv";
//dotenv.config()
//ENS -- linje 1 og linje 2+3 er funktionelt ens. import dotenv/config kalder config() med det samme


import express from "express";
const app = express();


app.use(express.static("public"));

import authRouter from "./routers/authRouter.js";

import session from "express-session";

import sessionRouter from "./routers/sessionRouter.js";

function greeterMiddleware(req, res, next) {
    console.log("hello");
    next();
}

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {secure: false},
}));

app.use(authRouter);

app.use(sessionRouter);

import helmet from "helmet";
app.use(helmet)

app.get("/room", greeterMiddleware, (req, res) => {
    res.send({ data: "you are in room 1"})
});

app.all("/", (req, res) => {
    console.log("hitting wildcard all on 009!");
    res.send({ data: "hit wildcard on 009"});
});

app.listen(8080, () => {
    console.log("server 009 running");
});