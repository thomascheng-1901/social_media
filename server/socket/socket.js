import {Server} from "socket.io"
import http from "http"
import express from "express"

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin:["https://social-media-jok9.onrender.com"],
        methods: ["GET", "POST", "PATCH"]
    }
});

io.on("connection", (socket) => {
    console.log("user connected to socket: " + socket.id);

    const userId = socket.handshake.query.userId;

    socket.on("disconnect", () => {
        console.log("user disconnected from socket: " + socket.id);
    });
});

export {app, io, server}