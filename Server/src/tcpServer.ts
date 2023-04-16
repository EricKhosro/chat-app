import { IServer, ISocket } from "./interfaces/interfaces";
import net, { Socket } from "net";
import { TCPSocket } from "./tcpSocket.js";
import { RequestHandler } from "./requestHandler.js";

export class TCPServer implements IServer {
  #onNewSocket: ((socket: ISocket) => void) | null = null;
  #server: net.Server | null = null;

  createServer = () => {
    this.#server = net.createServer((socket: Socket) => {
      console.log("new Client connected");
      const tcpSocket = new TCPSocket(socket);
      tcpSocket.setEvents({
        onData: (data: Buffer, guid: string | null) => {
          const requestHandler = new RequestHandler();
          const parsedDataArray = requestHandler.deSerializeData(data);
          parsedDataArray.map((parsedData) => {
            const res = requestHandler.handle(
              parsedData.methodName,
              guid,
              parsedData?.body
            );

            tcpSocket.sendData(res);
          });
        },
        onDisconnect: (guid: string | null) => {
          console.log("Client Disconnected");
        },
        onError: (error: Error, guid: string | null) => {
          console.log(error.message);
        },
      });
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
}
