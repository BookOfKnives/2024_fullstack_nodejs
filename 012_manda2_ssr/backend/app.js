import "dotenv/config";
import express from "express";
const app = express();

app.use(express.json());

import path from "path";
import mongoStore from "connect-mongo";

import session from "express-session";
app.use(session({
    secret: process.env.SESSION_SECRET,
    store: mongoStore.create({
        mongoUrl: process.env.MONGO_URL,
        dbName: process.env.MONGO_AUTH_DB,
    }),
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
}));

import sessionRouter from "./api/sessionApi/sessionApi.js";
app.use(sessionRouter);

app.get("/", (req, res) => {
    res.sendFile(path.resolve('../frontend/dist/index.html')); 
});

app.use(express.static(path.resolve("../frontend/dist")));

import authRouter from "./routers/authRouter.js";
app.use(authRouter);

const dateOptions = { 
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
};
const serverStartTime = Intl.DateTimeFormat("da-DK", dateOptions).format(new Date());

const PORT = process.env.PORT ?? 8080;
app.listen(PORT, () => {
    console.log(`App Server 012 Manda2 running on PORT: ${PORT}, started at TIME: ${serverStartTime}.`)
}); 