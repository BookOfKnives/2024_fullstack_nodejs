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
    credentials: true,
    methods: [ "GET", "PUT", "POST", "PATCH", "OPTIONS", "DELETE" ]
    
}
app.use(cors(corsOptions));

import usersApi from "./api/usersApi.js";
app.use("/api", usersApi);

import authRouter from "./routers/authRouter.js";
app.use(authRouter);

//test af noget?
app.get("/anything", async (req, res) => {
    const result = await fetch("http://localhost:8080/api/users")
        .then((response) => (response.json()))
        .then((result) => (console.log("this is result of anything in 010 app:", result)));
    res.send("we are the finish in anything.");
});


//test af session funbk -- kan slettes

app.get("/session", (req, res) => {
    const data = req.session 
    console.log("session being hit, name req: 01", req.session.userData);
    console.log("session being hit, id req: 01.1", req.session.id);
    res.send({ data });
});
app.post("/z", (req, res) => {
    console.log("z being hit, req session: 02", req.session.name);
    console.log("z being hit, id req: 02.1", req.session.id);
    req.session.name = "hans" 
    console.log("z being hit, req session 4asdasdasdasdasdasdasd:", req.session.name);
    res.send({ data: "ok" })
});

app.get('/num', function(req, res, next) {
    if (req.session.views) {
      req.session.views++
      res.setHeader('Content-Type', 'text/html')
      res.write('<p>views: ' + req.session.views + '</p>')
      res.write('<p>views: ' + req.session.name + '</p>')
      res.write('<p>expires in: ' + (req.session.cookie.maxAge / 1000) + 's</p>')
      res.end()
    } else {
      req.session.views = 1
      res.end('welcome to the session demo. refresh!')
    }
  })

//end test of session funk


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

export default app; //for testing purposes, exported into ./test/test.js