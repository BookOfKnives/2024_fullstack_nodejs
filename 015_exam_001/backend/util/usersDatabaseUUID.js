import { getAllUsers } from '../database/users/getAllUsers.js'
const allUsers = await getAllUsers()
const newDataEntryIdNumber = { newIdNumber: 0 }
function idNumberInitialisor () {
  allUsers.map((entry) => {
    if (newDataEntryIdNumber.newIdNumber < entry.user.id) {
      newDataEntryIdNumber.newIdNumber = entry.user.id
    }
  })
}
idNumberInitialisor()
export default newDataEntryIdNumber
