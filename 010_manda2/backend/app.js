import "dotenv/config";
import express from "express";
const app = express();

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
    credentials: true,
    methods: [ "GET", "PUT", "POST", "PATCH", "OPTIONS", "DELETE" ]
    
}
app.use(cors(corsOptions));

import usersApi from "./api/usersApi.js";
app.use("/api", usersApi);

import authRouter from "./routers/authRouter.js";
app.use(authRouter);

const PORT = process.env.PORT ?? 8080;
const dateOptions = { 
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
};
const serverStart = Intl.DateTimeFormat(undefined, dateOptions).format(new Date());

app.listen(PORT, () => { 
    console.log("Time:", serverStart);
    console.log("App server Manda02 listening on port:", PORT);
});

//export default app; //for testing purposes, exported into ./test/test.js