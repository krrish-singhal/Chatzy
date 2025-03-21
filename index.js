const http = require("http");
const express = require("express");
const path = require("path");
const { Server } = require("socket.io");
const app = express();

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*", // Allow all origins (for development)
        methods: ["GET", "POST"]
    }
});

const PORT=9000

io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("user-message", (message) => {
        // Broadcast the message to all other clients except the sender
        socket.broadcast.emit("message", message);
    });

    socket.on("disconnect", () => {
        console.log("A user disconnected");
    });
});

app.use(express.static(path.resolve("./public")));

app.get("/", (req, res) => {
    return res.sendFile(path.resolve("./public/index.html"));
});

server.listen(9000, () => console.log(`Server started at port http://localhost:${PORT}`));
