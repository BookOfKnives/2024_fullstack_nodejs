import { userColl } from '../connection.js'

export async function updateUserLastLoginTimeId (id, time) { 
  const result = await userColl.updateOne({ 'user.id': id }, { $set: { 'user.lastLogin': time } })
  return result
}

export async function patchUser (id, userPatchData) { 
  const result = await userColl.replaceOne({ 'user.id': id }, { $set: { user: userPatchData } })
  return result
}
