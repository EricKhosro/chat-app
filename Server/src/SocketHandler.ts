import { ISocket, ISocketHandler } from "./interfaces/interfaces";
import crypto from "crypto";
import { SocketPool } from "./socketPool.js";
import { UserManager } from "./userManager.js";

export class SocketHandler implements ISocketHandler {
  public registerSocker = (socket: ISocket) => {
    const guid = crypto.randomBytes(4).toString("hex");

    socket.setGuid(guid);

    SocketPool.getInstance().setRegisteredSockets({
      socket,
      guid,
    });
  };
  public onSocketDisconnect = (guid: string) => {
    SocketPool.getInstance().removeRegisteredSocket(guid);
    UserManager.getInstance().logoutUser(guid);
  };
}
