import 'dotenv/config'
import express from 'express'
import session from 'express-session'
import sessConf from './util/sessionConfigObject.js'
import path from 'path'
import authRouter from './routers/auth/authRouter.js'
import usersApi from './api/users/usersApi.js'
import { createServer as httpCreateServer } from 'http'
import { Server as ioServer } from 'socket.io'
import { ioSetup } from './socket/socket.js'
const debug = process.argv.includes('debug')
if (debug) console.log('Debugging is', debug)

const app = express()
const PORT = process.env.PORT ?? 8080
app.use(express.json())

const sessionMiddleware = session(sessConf)
app.use(sessionMiddleware)

app.use(authRouter)

import isAllowedToken from "./routers/auth/isAllowedToken.js"
app.get('/', isAllowedToken, (req, res) => { res.sendFile(path.resolve('../frontend/dist/index.html')) })
app.use(express.static('../frontend/dist/'))
app.use(usersApi)

import sessionsApi from './api/sessions/sessionsApi.js'
if (debug) app.use(sessionsApi)

app.get('*', (req, res) => { res.redirect('/') })
const httpServer = httpCreateServer(app)
const io = new ioServer(httpServer)
ioSetup(io, sessionMiddleware)

import { startUpMessager } from './util/startUpMessage.js'
httpServer.listen(PORT, () => { startUpMessager() })
