import { Socket } from "net";
import { ISocket, ISocketEvents } from "./interfaces/interfaces";
import { RequestHandler } from "./requestHandler.js";

export class TCPSocket implements ISocket {
  #socket: Socket;

  #events: ISocketEvents | null = null;

  constructor(socket: Socket) {
    this.#socket = socket;
    this.#socket.on("data", (data: Buffer) => {
      const parsedDataArray = this.#events?.onData(data, this.#guid);
      const requestHandler = new RequestHandler();

      if (parsedDataArray)
        parsedDataArray.map((parsedData) => {
          const res = requestHandler.handle(
            parsedData.methodName,
            this.#guid,
            parsedData?.body
          );
          if (res) this.sendData(res);
        });
    });
    this.#socket.on("error", (error: Error) =>
      this.#events?.onError(error, this.#guid)
    );
    this.#socket.on("close", () => this.#events?.onDisconnect(this.#guid));
  }

  #guid: string = "";
  public setGuid(guid: string) {
    this.#guid = guid;
  }

  public getGuid() {
    return this.#guid;
  }

  public setEvents = (events: ISocketEvents) => {
    this.#events = events;
  };

  public sendData = (data: any) => {
    this.#socket.write(JSON.stringify(data));
  };
}
