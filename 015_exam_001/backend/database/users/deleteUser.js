import { userColl } from '../connection.js'

export async function deleteUser (id) {
  return await userColl.deleteOne({ 'user.id': id })
}
