import express from "express"
import env from "./config/env"
import http from 'http'
import cors from "cors"

import connectToMongoDB from "./config/mongoDB"
import errorHandler from "./middlewares/errorHandler"
import responseHandler from "./middlewares/responseHandler"


import initializeWebSocket from "./socket"
import initializeFirebase from "./config/firebase"

import firebaseRoutes from './routes/firebaseRoutes'

await connectToMongoDB()

const app = express()
const server = http.createServer(app)


// Initialize Web-Socket connection
initializeWebSocket(server)

// Firebase setup
initializeFirebase()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors({
  origin: env.CLIENT_URL,
  credentials: true
}))
app.use(responseHandler)


app.use('/api/firebase', firebaseRoutes)




app.use(errorHandler)


server.listen(env.PORT, () => {
  console.log(`Listening on port ${env.PORT}`);
});
