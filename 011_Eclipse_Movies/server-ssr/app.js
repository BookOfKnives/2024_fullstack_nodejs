import "dotenv/config";

import express from "express";
const PORT = 8080;

import cors from "cors";

const app = express();
app.use(express.json());

app.use(cors({
    credentials: true,
    origin: true,
}));

import session from "express-session";

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {secure: false}
}));

import moviesRouter from "./routers/moviesRouter.js";
app.use(moviesRouter);
import customersRouter from "./routers/customersRouter.js";
app.use(customersRouter);

app.listen(PORT, () => {
    console.log("011 app server listening on PORT", PORT)
});