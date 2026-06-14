const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

const io = new Server(server);

app.use(express.static("../"));

io.on("connection", (socket) => {

    console.log("User Connected");

    socket.on("join-room", (data) => {

        socket.join(data.roomId);

        io.to(data.roomId).emit(
            "user-joined",
            data.userName
        );
    });

    socket.on("disconnect", () => {

        console.log("User Disconnected");

    });

});

server.listen(3000, () => {

    console.log(
        "Server Running on http://localhost:3000"
    );

});