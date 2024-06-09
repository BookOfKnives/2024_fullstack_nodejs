import 'dotenv/config'

import passwordUtil from '../../util/password.js'
import { Router } from 'express'
import { getUser } from '../../database/users/getUser.js'
import { createUser } from '../../database/users/createUser.js'
import { updateUserLastLoginTimeId } from '../../database/users/updateUser.js'
import mailer from '../../util/mailer.js'
import jwt from 'jsonwebtoken'
import path from 'path'

import newDataEntryIdNumber from '../../util/usersDatabaseUUID.js'

const PUBLIC_KEY = process.env.PUBLIC_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY

const router = Router()
const startUpMessage = 'Auth Router online.' // TODO brug UUIDs ist for
const highestUserIDNumber = newDataEntryIdNumber

router.get('/', async (req, res, next) => {
  if (!req.session.token) {
    res.sendFile(path.resolve('./public/login.html'))
  } else {
    next()
  }
})

export function isAdmin (req, res, next) {
  if (!jwt.verify(req.session.token, process.env.PUBLIC_KEY, { algorithm: 'RS256' }).roles.includes('admin')) { res.status(403).send('Sorry amigo, you dont have the right token!') } else next()
}

router.post('/newusersignup', async (req, res) => {
  const data = req.body

  let badInput = false
  if (!data.name) badInput = true
  if (!data.password) badInput = true
  if (badInput) res.status(403).send('bad input')

  const pw = await passwordUtil.hash(data.password)
  const newUser = {
    id: ++highestUserIDNumber.newIdNumber,
    username: data.name,
    password: pw,
    email: data?.email,
    signUpDate: new Date().toLocaleString('da-DK', { timeZone: 'Europe/Copenhagen' }),
    lastLogin: null
  }
  try {
    await createUser(newUser)
  } catch (err) {
    console.error('authRouter newuserSignup error in createUser:', err)
  }
  try {
    const newUserEmail = newUser.email
    mailer(newUserEmail)
  } catch (err) {
    console.error('authRouter error in mailing, error:', err)
  }
  const tokenInfo = {
    name: newUser.username,
    roles: []
  }
  const token = await jwt.sign(tokenInfo, PRIVATE_KEY, { algorithm: 'RS256', expiresIn: '5m' })
  req.session.token = token
  req.session.username = newUser.username
  req.session.roles = tokenInfo.roles
  res.status(200).send({ token })
})

router.post('/login', async (req, res) => {
  const signInattempt = req.body // this expects { name: "somename", password: "somepassword" };
  let dbLookup
  try {
    dbLookup = await getUser(req.body)
  } catch (err) {
    console.error('login in authRouter gives error on dbLookUp, error:', err)
  }
  let pwCheck = false
  try {
    pwCheck = await passwordUtil.compare(signInattempt.password, dbLookup.user.password)
  } catch (err) {
    console.error('pwcheck in authRouter gives error on pwCheck, error:', err)
  }
  if (pwCheck) {
    const idNumber = dbLookup.user.id
    const newDate = new Date().toLocaleString('da-DK', { timeZone: 'Europe/Copenhagen' })
    updateUserLastLoginTimeId(idNumber, newDate)
    const tokenInfo = {
      name: dbLookup.user.username,
      roles: dbLookup.user.roles ?? []
    }
    const token = await jwt.sign(tokenInfo, PRIVATE_KEY, { algorithm: 'RS256', expiresIn: '5m' })
    req.session.token = token
    req.session.username = dbLookup.user.username
    req.session.roles = dbLookup.user.roles
    res.status(200).send({ token })
  } else {
    res.status(403).send('unlawful password or username')
  }
})

router.get('/jwtToken', (req, res) => {
  res.send(req.session)
})

console.log(startUpMessage)
export default router
