const app = require("./app.js");
const port = 3000;

const server = app.listen(port, function () {
  console.log("Express listening on port", port);
});

const listen = require("socket.io");
const io = listen(server);
io.use((socket, next) => {
  app.sessionMiddleWare(socket.request, socket.request.res, next);
});
const socketConnection = require("./helpers/socketConnection");
socketConnection(io);
//한줄로 줄이면 require("./helpers/socketConnection")(io);
