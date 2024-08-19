import { MongoClient, BSON } from 'mongodb'

let connectionString = import.meta.env.DATA_CONNECTION || ''

if (!connectionString) {
    throw new Error(
        'No connection string provided. \n\nPlease create a `.env` file in the root of this project. Add a DATA_CONNECTION variable to that file with the connection string to your MongoDB cluster. \nRefer to the README.md file for more information.',
    )
}
if (connectionString.indexOf('appName') === -1) {
    connectionString += connectionString.indexOf('?') > -1 ? '&appName=remix|' : '?appName=remix|'
} else {
    connectionString = connectionString.replace(
        /appName\=([a-z0-9]*)/i,
        (_m: string, p: string) => `appName=remix|${p}`,
    )
}

let mongodb: MongoClient

declare global {
    var __db: MongoClient | undefined
}

if (process.env.NODE_ENV === 'production') {
    mongodb = new MongoClient(connectionString)
} else {
    if (!global.__db) {
        global.__db = new MongoClient(connectionString)
    }
    mongodb = global.__db
}

let ObjectId = BSON.ObjectId

export { mongodb, ObjectId }
