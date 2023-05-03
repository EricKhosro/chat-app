import { IServer, ISocket, ISocketEvents } from "../interfaces/interfaces";
import { WebSocketServer } from "ws";
import { WSSocket } from "./wsSocket.js";

export class WSServer implements IServer {
  #onNewSocket: ((socket: ISocket) => void) | null = null;
  #server: WebSocketServer | null = null;
  #events: ISocketEvents | null = null;

  constructor() {
    this.#server?.on("connection", (socket) => {
      const wsSocket = new WSSocket(socket);
      if (!this.#events)
        return console.log("tcp server events was not provided");
      wsSocket.setEvents(this.#events);

      if (this.#onNewSocket) this.#onNewSocket(wsSocket);
    });
  }

  public createServer = () => {
    this.#server = new WebSocketServer({ port: 3000 });
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
