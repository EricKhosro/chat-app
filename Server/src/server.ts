import { SocketHandler } from "./SocketHandler.js";
import { ISocket } from "./interfaces/interfaces";
import { TCPServer } from "./tcpServer.js";

const server = new TCPServer();
server.setOnNewSocket((socket: ISocket) => {
  const socketHandler = new SocketHandler();
  socketHandler.registerSocker(socket);
});
server.createServer();
server.startListening(3000, "localhost");

