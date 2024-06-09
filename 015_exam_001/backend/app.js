import 'dotenv/config'
import express from 'express'

import session from 'express-session'
import sessConf from './util/sessionConfigObject.js'

import path from 'path'

import authRouter from './routers/auth/authRouter.js'

import usersApi from './api/users/usersApi.js'

import sessionsApi from './api/sessions/sessionsApi.js'

import { createServer as httpCreateServer } from 'http'
import { Server as ioServer } from 'socket.io'

import { ioSetup } from './socket/socket.js'

import { startUpMessager } from './util/startUpMessage.js'
const app = express()
const PORT = process.env.PORT ?? 8080
app.use(express.json())
// TODO: lav "brødkrummer" til dig selv i koden til eksamen

const debug = process.argv.includes('debug')
if (debug) console.log('Debugging is', debug)
const sessionMiddleware = session(sessConf)
app.use(sessionMiddleware)
// app.use("*", authRouter);
app.all('*', authRouter)

app.get('/', (req, res) => { res.sendFile(path.resolve('../frontend/dist/index.html')) })
app.use(express.static('../frontend/dist/'))
app.use(usersApi)
app.use(sessionsApi)

// TODO: message of the day api  can only be set by admins

// TODO forum posts

// TODO sandwich maker

// import battleShipsRouter from "./game/battleships.js";

app.get('*', (req, res) => { res.redirect('/') })
const httpServer = httpCreateServer(app)
const io = new ioServer(httpServer)
ioSetup(io, sessionMiddleware)
httpServer.listen(PORT, () => { startUpMessager() })
