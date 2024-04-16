import "dotenv/config";

import express from "express";
const app = express();

//app.use(express.static("public")) //har backend brug for en public?

app.use(express.json());

import session from "express-session";

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

import { rateLimit } from "express-rate-limit";

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 60,
    standardHeaders: "draft-7",
    legacyHeaders: false,
});

app.use(limiter);

import helmet from "helmet";
app.use(helmet());

import cors from "cors";
let corsWhiteList = [ "http://localhost:8080", "http://localhost:5173" ];
let corsOptions = {
    origin: function (origin, callback) {
        if ( corsWhiteList.indexOf( origin ) !== -1 || !origin) {

            callback(null, true)
    } else {
        callback(new Error("Not allowed by CORS"))
    }},
    methods: [ "GET", "PUT", "POST", "PATCH", "OPTIONS", "DELETE" ]
    
}
app.use(cors())

import usersApi from "./api/usersApi.js";
app.use("/api", usersApi);

import authRouter from "./routers/authRouter.js";
app.use(authRouter);

import bcrypt from "bcrypt";

app.get("/anything", async (req, res) => {
    const result = await fetch("http://localhost:8080/api/users")
        .then((response) => (response.json()))
        .then((result) => (console.log("this is result of anything in 010 app:", result)));
    res.send("we are the finish in anything.");
});

app.post("/test", (req, res) => {

})

const PORT = process.env.PORT ?? 8080;
app.listen(PORT, () => { console.log("App server Manda02 listening on port:", PORT) });