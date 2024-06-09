import "dotenv/config";
import express from "express";
const app = express();
const PORT = process.env.PORT ?? 8080;
app.use(express.json());
import { myLogger as l } from "./util/logger.js";
//TODO: lav "brødkrummer" til dig selv i koden til eksamen

const debug = process.argv.includes("debug");
if (debug) console.log("Debugging is", debug);

import session from "express-session";
import sessConf from "./util/sessionConfigObject.js";
const sessionMiddleware = session(sessConf)
app.use(sessionMiddleware);

import path from "path";

import authRouter from "./routers/auth/authRouter.js";
// app.use("*", authRouter);
app.all("*", authRouter);

app.get("/", (req, res) => { res.sendFile(path.resolve("../frontend/dist/index.html")); });
app.use(express.static("../frontend/dist/"));


import usersApi from "./api/users/usersApi.js";
app.use(usersApi);

import sessionsApi from "./api/sessions/sessionsApi.js";
app.use(sessionsApi);

//TODO: message of the day api  can only be set by admins

//TODO forum posts

//TODO sandwich maker

// import battleShipsRouter from "./game/battleships.js";

app.get("*", (req, res) => { res.redirect("/"); });



import { createServer as httpCreateServer } from "http";
import { Server as ioServer } from "socket.io";
const httpServer = httpCreateServer(app); 
const io = new ioServer(httpServer);

import { ioSetup } from "./socket/socket.js";
ioSetup(io, sessionMiddleware);

import { startUpMessager } from "./util/startUpMessage.js";
httpServer.listen(PORT, () => { startUpMessager(); }); 