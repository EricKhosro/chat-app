import { ISocket, ISocketHandler } from "./interfaces/interfaces";
import crypto from "crypto";
import { SocketPool } from "./socketPool.js";

export class SocketHandler implements ISocketHandler {
  public registerSocker = (socket: ISocket) => {
    const socketPool = new SocketPool();
    socketPool.setRegisteredSockets({
      socket: socket,
      guid: crypto.randomBytes(4).toString("hex"),
    });
  };
}
