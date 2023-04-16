import { SocketHandler } from "./SocketHandler.js";
import { ISocket } from "./interfaces/interfaces";
import { TCPServer } from "./tcpServer.js";

const server = new TCPServer();
const socketHandler = new SocketHandler();
server.setOnNewSocket((socket: ISocket) => {
  socketHandler.registerSocker(socket);
});
server.createServer();
server.startListening(3000, "localhost");
