import { MongoClient } from 'mongodb'
const startUpMessage = 'MongoDb Connection online.'
const client = new MongoClient(process.env.DB_URL)
const connection = await client.connect()
const db = connection.db('AuthDb')

export const userColl = db.collection('users')
console.log(startUpMessage)
