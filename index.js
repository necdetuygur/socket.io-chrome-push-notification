var
    http = require('http'),
    path = require('path'),
    socketio = require('socket.io'),
    express = require('express'),
    router = express(),
    server = http.createServer(router),
    io = socketio.listen(server),
    sockets = []
;

io.on('connection', function (socket) {
    sockets.push(socket);

    socket.on('disconnect', function () {
        sockets.splice(sockets.indexOf(socket), 1);
    });

    socket.on('CreateNotification', function (data) {
        io.emit("Notification", data);
    });
});

router.use(express.static(path.resolve(__dirname, 'www')));
server.listen(process.env.PORT || 1995, process.env.IP || "0.0.0.0", function () {
    console.log(
        server.address().address,
        server.address().port
    );
});

// socket.emit("CreateNotification", {
//     title: "Test Title",
//     url: "https://github.com",
//     icon: "https://github.com/favicon.ico",
//     text: "Test Content"
// });
