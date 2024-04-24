import "dotenv/config";
import express from "express";
const app = express();

app.use(express.json());

import path from "path";
app.use(express.static(path.resolve("../frontend/dist")));

import livereload from "livereload";
import connectLivereload from "connect-livereload";

const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.resolve("../frontend/dist/"));
liveReloadServer.server.once("connection", () => { 
    setTimeout(() => {
        liveReloadServer.refresh("/");
    }, 500);
});

app.use(connectLivereload());

import session from "express-session";
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
}));


app.get("*", (req, res) => {
    res.sendFile(path.resolve('../client/dist/index.html'));
});

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