import { Server } from "socket.io"
import http from 'http'
import env from "@/config/env"


type ClientToServerEvents = {

}

type ServerToClientEvents = {

}


const initializeWebSocket = (server: http.Server) => {
    const io = new Server<ClientToServerEvents, ServerToClientEvents>(server, {
        cors: {
            origin: env.CLIENT_URL,
            credentials: true
        }
    })





    io.on('connection', (socket) => {
        console.log(`New socket connection, ${socket.id} total clients = ${io.engine.clientsCount}`)



        // Extras
        socket.on('disconnect', () => {
            console.log(`Disconnected socket with socketId: ${socket.id}`)
            console.log(`Total remaining connections = ${io.engine.clientsCount}`)
        })
    })
}

export default initializeWebSocket