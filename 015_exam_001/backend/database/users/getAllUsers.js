import { userColl } from '../connection.js'

export async function getAllUsers () {
  return await userColl.find({}).toArray()
}
