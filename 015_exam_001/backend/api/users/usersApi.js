import { Router } from 'express'

import passwordUtil from '../../util/password.js'
import { createUser } from '../../database/users/createUser.js'
import { getAllUsers } from '../../database/users/getAllUsers.js'
import { patchUser } from '../../database/users/updateUser.js'
import { getOneUser } from '../../database/users/getOneUser.js'
import { deleteUser } from '../../database/users/deleteUser.js'

import jwt from 'jsonwebtoken'
import { myLogger as l } from '../../util/logger.js'

const debug = process.argv.includes('debug')
const router = Router()
const startUpMessage = 'Users API Router online.'
const routerUrl = '/api/users'

function isAdmin (req, res, next) {
  if (req.session.token) {
    const tokenSignature = jwt.verify(req.session.token, process.env.PUBLIC_KEY, { algorithm: 'RS256' })
    if (tokenSignature.roles.includes('admin')) {
      next()
    } else res.status(403).send('Sorry amigo, you dont have the right token!')
  } else res.status(403).send('Sorry amigo, you dont have the right token!')
}
router.use(isAdmin)

router.get(routerUrl, async (req, res) => {
  const data = await getAllUsers()
  res.send({ data })
})
router.get(routerUrl + '/:idnumber', async (req, res) => {
  const idNumber = Number(req.params.idnumber)
  const result = await getOneUser(idNumber)
  if (result) res.send({ result })
  else res.status(404).send({ data: 'User not found!' })
})

router.post(routerUrl, (req, res) => {
  const user = req.body
  if (debug) { console.log('usersApi RouterPost says, USER from req.body:', user) }
  try {
    createUser(user)
  } catch (err) {
    console.error('userApi cannot create user, error:', err)
  }
  res.send({ user })
})

router.patch(routerUrl + '/:idnumber', async (req, res) => {
  const idNumber = Number(req.params.idnumber)
  const userFromReq = req.body
  const userFromDb = await getOneUser(idNumber)
  userFromReq.username ? userFromDb.username = userFromReq.username : userFromDb.username
  userFromReq.password ? userFromDb.password = passwordUtil.hash(userFromReq.password) : userFromDb.password
  userFromReq.email ? userFromDb.email = userFromReq.email : userFromDb.email
  userFromReq.roles ? userFromDb.roles = userFromReq.roles : userFromDb.roles
  const result = await patchUser(userFromDb, idNumber)
  res.status(200).send({ result })
})

router.delete(routerUrl + '/:idnumber', async (req, res) => {
  const idNumber = Number(req.params.idnumber)
  const result = await deleteUser(idNumber)
  res.send({ result })
})

export default router
console.log(startUpMessage)
