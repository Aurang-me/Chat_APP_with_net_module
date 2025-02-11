const net = require("net");

const server = net.createServer();

const clients = [];

server.on("connection", (socket) => {
    console.log("A new connection to server!!!");

    socket.on("data", (data) => {

        clients.map((socket) => {
            socket.write(data);
        });
    });

    clients.push(socket);
});

server.listen(3008, "127.0.0.1", () => {
    console.log("server is listening at ", server.address());
})