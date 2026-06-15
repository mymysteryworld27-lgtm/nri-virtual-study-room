const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);

const io = new Server(server);

app.use(express.static(path.join(__dirname, "..")));

const rooms = {};

io.on("connection", (socket) => {

    console.log("User Connected");

    socket.on("join-room", ({ roomId, userName }) => {

        socket.join(roomId);

        if (!rooms[roomId]) {
            rooms[roomId] = [];
        }

        rooms[roomId].push(userName);

        io.to(roomId).emit(
            "participant-list",
            rooms[roomId]
        );

        io.to(roomId).emit(
            "notification",
            `${userName} joined the room`
        );

        socket.on("disconnect", () => {

            if (rooms[roomId]) {

                rooms[roomId] =
                rooms[roomId].filter(
                    user => user !== userName
                );

                io.to(roomId).emit(
                    "participant-list",
                    rooms[roomId]
                );

                io.to(roomId).emit(
                    "notification",
                    `${userName} left the room`
                );
            }
        });

    });

});

server.listen(3000, () => {

    console.log(
        "Server running on http://