const express = require("express");
const http = require("http");
const path = require("path");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, "..")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "index.html"));
});

const PORT = process.env.PORT || 3000;

io.on("connection", (socket) => {
    console.log("User Connected");

    socket.on("join-room", (roomId) => {
        socket.join(roomId);

        socket.to(roomId).emit(
            "message",
            "A new participant joined the room"
        );
    });

    socket.on("disconnect", () => {
        console.log("User Disconnected");
    });
});

server.listen(PORT, () => {
    console.log(`Server Running on Port ${PORT}`);
});