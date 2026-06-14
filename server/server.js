const express = require("express");
const http = require("http");
const path = require("path");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve frontend files
app.use(express.static(path.join(__dirname, "../")));

// Home page
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../index.html"));
});

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

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Server Running on Port ${PORT}`);
});