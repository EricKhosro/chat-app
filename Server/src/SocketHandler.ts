import { ISocket, ISocketHandler } from "./interfaces/interfaces";
import crypto from "crypto";
import { SocketPool } from "./socketPool.js";

export const globalSocketPool = new SocketPool();
export class SocketHandler implements ISocketHandler {
  public registerSocker = (socket: ISocket) => {
    const guid = crypto.randomBytes(4).toString("hex");

    socket.setGuid(guid);

    globalSocketPool.setRegisteredSockets({
      socket,
      guid,
    });

    // socket.sendData({ methodname: "successfulConnection", guid });
  };
}
