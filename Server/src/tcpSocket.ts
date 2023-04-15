import { Socket } from "net";
import { ISocket, ISocketEvents } from "./interfaces/interfaces";

export class TCPSocket implements ISocket {
  #socket: Socket;
  #events: ISocketEvents | null = null;

  constructor(socket: Socket) {
    this.#socket = socket;
    this.#socket.on("data", (data: Buffer) => this.#events?.onData(data));
    this.#socket.on("error", (error: Error) => this.#events?.onError(error));
    this.#socket.on("close", () => this.#events?.onDisconnect());
  }

  public setEvents = (events: ISocketEvents) => {
    this.#events = events;
  };

  public sendData = (data: Buffer) => {
    this.#socket.write(JSON.stringify(data));
  };
}
