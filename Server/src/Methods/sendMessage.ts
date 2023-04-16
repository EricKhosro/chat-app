import { globalSocketPool } from "../SocketHandler.js";
import { IMethodClass, IPacket } from "../interfaces/interfaces";
import { SendMessageDTO } from "../interfaces/sendMessageInterface";

export class SendMessage implements IMethodClass<SendMessageDTO, void> {
  public handle = (data: SendMessageDTO, guid: string | null) => {
    const receiversSockets = globalSocketPool.getRegisteredSockets(
      data.receiversIDs
    );
    receiversSockets.map((s) => {
      s.socket.sendData(data.message);
    });
  };
}
