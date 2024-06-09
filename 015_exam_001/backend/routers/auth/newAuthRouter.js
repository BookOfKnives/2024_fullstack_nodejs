import 'dotenv/config'

import passwordUtil from '../../util/password.js'
import { Router } from 'express'
import { getUser } from '../../database/users/getUser.js'
import { createUser } from '../../database/users/createUser.js'
import { updateUserLastLoginTimeId } from '../../database/users/updateUser.js'
import mailer from '../../util/mailer.js'
import { myLogger as l } from '../../util/logger.js'
import jwt from 'jsonwebtoken'
import path from 'path'

import newDataEntryIdNumber from '../../util/usersDatabaseUUID.js'

const PUBLIC_KEY = process.env.PUBLIC_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY

const router = Router()
const startUpMessage = 'NEW Auth Router online.' // TODO btyug UUIDs ist for
const highestUserIDNumber = newDataEntryIdNumber // I cannot see how this would have any side-effects. *nervous laughing*

// router.use(isAdmin); //TODO is this the right place for admin?? 0706

router.get('/', async (req, res, next) => {
  l.dl()
  l.cll('authrouter 015 hit')
  // let jwToken = await jwt.sign( { balls: "mine" }, PRIVATE_KEY, { algorithm: "RS256", expiresIn: '5m' } );
  // req.session.jwToken = jwToken;
  // let verify = await jwt.verify(jwToken, PUBLIC_KEY, { algorithm: "RS256" } );
  // l.cll("verify?", verify || null);
  if (!req.session.token) {
    l.dl()
    l.cll('you dont have a token, /, serving login')
    res.sendFile(path.resolve('./public/login.html'))
  } else {
    l.dl()
    l.cll('you have a token!', req.session.token)
    next()

    // res.status(403).redirect("/")
  }
  // else { res.send("authrouter 015 gopod luck!"); }
  // res.send("authrouter 015 gopod luck!");
})

router.get('/publickey', (req, res) => {
  l.dl()
  l.cll('publickey in authrouter HIT')
  res.send(JSON.stringify(PUBLIC_KEY))
})

export function isAdmin (req, res, next) {
  l.dl()
  l.cll('isAdmin funciont in authrouiter HIT')
  const token = req.session?.token
  let tokenVerified
  if (token) {
    l.dl()
    l.cll('isAdmin lookup, tokenVerified? 01')
    tokenVerified = jwt.verify(token, PUBLIC_KEY, { algorithm: 'RS256' })
    l.cll('token:', tokenVerified)
  }
  if (tokenVerified.roles.includes('admin')) {
    l.dl()
    l.cll('isAdmin lookup, tokenVerified? 02')
    next()
  } else { res.status(403).send('forbidden, unlawful role for access.') }
}

console.log(startUpMessage)
export default router
