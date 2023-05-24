import { SocketHandler } from "./SocketHandler.js";
import { ISocket } from "./interfaces/interfaces";
import { TCPServer } from "./TCP/tcpServer.js";
import { RequestHandler } from "./requestHandler.js";
import { WSServer } from "./WS/wsServer.js";

const tcpServer = new TCPServer();
const socketHandler = new SocketHandler();
tcpServer.setOnNewSocket((socket: ISocket) => {
  socketHandler.registerSocker(socket);
});
tcpServer.setEvents({
  onData: (data: Buffer, guid: string | null) => {
    const requestHandler = new RequestHandler();
    const parsedDataArray = requestHandler.deSerializeData(data);
    return parsedDataArray;
  },
  onDisconnect: (guid: string | null) => {
    console.log("Client Disconnected");
    if (guid) socketHandler.onSocketDisconnect(guid);
  },
  onError: (error: Error, guid: string | null) => {
    console.log(error.message);
  },
});
tcpServer.createServer();
tcpServer.startListening(3000, "0.0.0.0");

// tcpServer.startListening(3000, "10.21.9.24");

const wSServer = new WSServer();
wSServer.setOnNewSocket((socket: ISocket) => {
  socketHandler.registerSocker(socket);
});
wSServer.setEvents({
  onData: (data: Buffer, guid: string | null) => {
    const requestHandler = new RequestHandler();
    const parsedDataArray = requestHandler.deSerializeData(data);
    return parsedDataArray;
  },
  onDisconnect: (guid: string | null) => {
    console.log("Client Disconnected");
    if (guid) socketHandler.onSocketDisconnect(guid);
  },
  onError: (error: Error, guid: string | null) => {
    console.log(error.message);
  },
});
wSServer.createServer();
// console.log("WS created");
