import bcrypt from 'bcrypt'
import 'dotenv/config'

const SALT = Number(process.env.SALT)

async function compare (signInPassword, dbHashedPassword) {
  return await bcrypt.compare(signInPassword, dbHashedPassword)
}

async function hash (pw) {
  const hashedPw = await bcrypt.hash(pw, SALT)
  return hashedPw
}

export default {
  compare,
  hash
}
