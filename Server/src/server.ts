import { SocketHandler } from "./SocketHandler.js";
import { ISocket } from "./interfaces/interfaces";
import { TCPServer } from "./tcpServer.js";
import { RequestHandler } from "./requestHandler.js";

const server = new TCPServer();
const socketHandler = new SocketHandler();
server.setOnNewSocket((socket: ISocket) => {
  socketHandler.registerSocker(socket);
});
server.setEvents({
  onData: (data: Buffer, guid: string | null) => {
    const requestHandler = new RequestHandler();
    const parsedDataArray = requestHandler.deSerializeData(data);
    return parsedDataArray;
  },
  onDisconnect: (guid: string | null) => {
    console.log("Client Disconnected");
  },
  onError: (error: Error, guid: string | null) => {
    console.log(error.message);
  },
});
server.createServer();
server.startListening(3000, "localhost");
