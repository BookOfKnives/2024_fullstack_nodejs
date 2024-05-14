import "dotenv/config";
import express from "express";
const app = express();
const PORT = process.env.PORT ?? 8080;
app.use(express.json());

let debug = (process.argv[2] === "debug")
if (debug) console.log("Debugging is", debug);

import session from "express-session";
import sessConf from "./util/sessionConfigObject.js";
app.use(session(sessConf));

import path from "path";
app.get("/", (req, res) => { res.sendFile(path.resolve("../frontend/dist/index.html")); });
app.use(express.static("../frontend/dist/"));

import usersApi from "./api/users/usersApi.js";
app.use(usersApi);

import sessionsApi from "./api/sessions/sessionsApi.js";
app.use(sessionsApi);

import authRouter from "./routers/auth/authRouter.js";
app.use(authRouter);

app.get("*", (req, res) => { res.redirect("/"); });

import http from "http";
import { Server as ioServer } from "socket.io";
const httpServer = http.createServer(app);

const io = new ioServer(httpServer);

import { setupSocket, debugSocket } from "./socket/socket.js";
debugSocket(debug);
setupSocket(io);

import { startUpMessager } from "./util/startUpMessage.js";
httpServer.listen(PORT, () => { startUpMessager(); }); 