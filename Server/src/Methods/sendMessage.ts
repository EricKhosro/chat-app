import { IMethodClass } from "../interfaces/interfaces";
import { SendMessageDTO } from "../interfaces/sendMessageInterface";
import { SocketPool } from "../socketPool.js";
import { UserManager } from "../userManager.js";

export class SendMessage implements IMethodClass<SendMessageDTO, void> {
  public handle = (data: SendMessageDTO, guid: string | null) => {
    try {
      const receiversSockets = SocketPool.getInstance().getRegisteredSockets(
        data.receiversIDs
      );
      receiversSockets.map((s) => {
        s.socket.sendData({
          methodName: "sendMessage",
          body: {
            message: data.message,
            senderName: UserManager.getInstance().getName(guid || ""),
          },
        });
      });
    } catch (e) {
      if (e instanceof Error) console.log(e.message);
    }
  };
}
