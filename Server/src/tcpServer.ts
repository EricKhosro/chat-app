import { IServer, ISocket, ISocketEvents } from "./interfaces/interfaces";
import net, { Socket } from "net";
import { TCPSocket } from "./tcpSocket.js";

export class TCPServer implements IServer {
  #onNewSocket: ((socket: ISocket) => void) | null = null;
  #server: net.Server | null = null;
  #events: ISocketEvents | null = null;
  createServer = () => {
    this.#server = net.createServer((socket: Socket) => {
      console.log("new Client connected");
      const tcpSocket = new TCPSocket(socket);
      if (!this.#events)
        return console.log("tcp server events was not provided");
      tcpSocket.setEvents(this.#events);

      if (this.#onNewSocket) this.#onNewSocket(tcpSocket);
    });
  };

  public setOnNewSocket = (onNewSocket: (socket: ISocket) => void) => {
    this.#onNewSocket = onNewSocket;
  };

  public startListening = (port: number, host: string) => {
    if (!this.#server) return;
    this.#server.listen(port, host);
  };

  public setEvents = (events: ISocketEvents) => {
    this.#events = events;
  };
}
