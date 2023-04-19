import { globalSocketPool } from "../SocketHandler.js";
import { IMethodClass, IPacket } from "../interfaces/interfaces";
import {
  ISendMessageResponse,
  SendMessageDTO,
} from "../interfaces/sendMessageInterface";

export class SendMessage implements IMethodClass<SendMessageDTO, void> {
  public handle = (data: SendMessageDTO, guid: string | null) => {
    console.log({ data });
    try {
      const receiversSockets = globalSocketPool.getRegisteredSockets(
        data.receiversIDs
      );
      receiversSockets.map((s) => {
        s.socket.sendData({
          methodName: "sendMessage",
          body: {
            message: data.message,
            senderName: data.senderName,
          },
        });
      });
    } catch (e) {
      if (e instanceof Error) console.log(e.message);
    }
  };
}
