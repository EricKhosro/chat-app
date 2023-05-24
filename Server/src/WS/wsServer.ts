import { IServer, ISocket, ISocketEvents } from "../interfaces/interfaces";
import { WebSocketServer } from "ws";
import { WSSocket } from "./wsSocket.js";

export class WSServer implements IServer {
  #onNewSocket: ((socket: ISocket) => void) | null = null;
  #server: WebSocketServer | null = null;
  #events: ISocketEvents | null = null;

  public createServer = () => {
    // this.#server = new WebSocketServer({ port: 5000, host: "10.21.9.24" });
    this.#server = new WebSocketServer({ port: 5000, host: "0.0.0.0" });
    

    this.#server.on("connection", (socket) => {
      console.log("WS Client connected");

      const wsSocket = new WSSocket(socket);
      if (!this.#events)
        return console.log("WS server events was not provided");
      wsSocket.setEvents(this.#events);

      if (this.#onNewSocket) this.#onNewSocket(wsSocket);
    });
  };
  public setEvents = (events: ISocketEvents) => {
    this.#events = events;
  };
  public setOnNewSocket = (onNewSocket: (socket: ISocket) => void) => {
    this.#onNewSocket = onNewSocket;
  };

  public startListening = (port: number, host: string) => {
    if (!this.#server) return;
    this.#server.options = { port, host };
  };
}
