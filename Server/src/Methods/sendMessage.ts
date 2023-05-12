import { globalSocketPool } from "../SocketHandler.js";
import { IMethodClass, IPacket } from "../interfaces/interfaces";
import {
  ISendMessageResponse,
  SendMessageDTO,
} from "../interfaces/sendMessageInterface";
import { globalUserManager } from "./login.js";

export class SendMessage implements IMethodClass<SendMessageDTO, void> {
  public handle = (data: SendMessageDTO, guid: string | null) => {
    try {
      const receiversSockets = globalSocketPool.getRegisteredSockets(
        data.receiversIDs
      );
      receiversSockets.map((s) => {
        s.socket.sendData({
          methodName: "sendMessage",
          body: {
            message: data.message,
            senderName: globalUserManager.getName(guid || ""),
          },
        });
      });
    } catch (e) {
      if (e instanceof Error) console.log(e.message);
    }
  };
}
