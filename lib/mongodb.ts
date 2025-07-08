// lib/mongodb.ts
import { MongoClient } from 'mongodb'

if (!process.env.MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local')
}

const uri: string = process.env.MONGODB_URI
const options = {}

let client: MongoClient
let clientPromise: Promise<MongoClient>

declare global {
  // allow global `var` declarations
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient>
}

if (process.env.NODE_ENV === 'development') {
  // In dev mode, use a global variable to preserve the value across hot reloads
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options)
    global._mongoClientPromise = client.connect()
    console.log("connected")
}
clientPromise = global._mongoClientPromise
} else {
    console.log("connected_2")
  // In production, don't use global
  client = new MongoClient(uri, options)
  clientPromise = client.connect()
}

export default clientPromise