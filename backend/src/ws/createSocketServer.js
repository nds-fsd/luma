const { createServer } = require("http");
const { Server } = require("socket.io");


const startSocketServer = () => {
    const httpServer = createServer();
    const io = new Server(httpServer, {
        cors: {
            origins: ['*']
        }
    });

    io.on("connection", (socket) => {
        console.log('User connected: ', socket.id);

        socket.emit("messageWelcome", {
            from: "Server",
            body: `Welcome ${socket.id}`
        });

        io.emit("welcomeEverybody", {
            from: "Server",
            body: "HOLA A TODOS"
        })

        socket.on("disconnect", () => {
            console.log('User disconnected: ', socket.id);
            
        });
    });

    httpServer.listen(3002, () => {
        console.log("Socket server is Running on port 3002");
    });

    return io;
}
module.exports = startSocketServer
