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

import jwt from 'jsonwebtoken'

import { startUpMessager } from './util/startUpMessage.js'
const app = express()
const PORT = process.env.PORT ?? 8080
app.use(express.json())
// TODO: lav "brødkrummer" til dig selv i koden til eksamen

const debug = process.argv.includes('debug')
if (debug) console.log('Debugging is', debug)
const sessionMiddleware = session(sessConf)
app.use(sessionMiddleware)

app.get('/publickey', (req, res) => {
  const jsonKey = JSON.stringify(process.env.PUBLIC_KEY)
  console.log('public key jsonkey:', jsonKey)
  res.send({ jsonKey })
})

app.use(authRouter)

function isAllowedInSvelte (req, res, next) {
  if (!jwt.verify(req.session.token, process.env.PUBLIC_KEY, { algorithm: 'RS256' })) res.status(403).send('Sorry amigo, you dont have the right token!')
  else next()
}

app.get('/', isAllowedInSvelte, (req, res) => { res.sendFile(path.resolve('../frontend/dist/index.html')) })
app.use(express.static('../frontend/dist/'))
app.use(usersApi)
app.use(sessionsApi)

app.get('*', (req, res) => { res.redirect('/') })
const httpServer = httpCreateServer(app)
const io = new ioServer(httpServer)
ioSetup(io, sessionMiddleware)
httpServer.listen(PORT, () => { startUpMessager() })
