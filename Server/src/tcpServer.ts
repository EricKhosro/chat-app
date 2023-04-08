import { IConnection, IRequestData } from "./interfaces/interfaces";
import net, { Socket } from "net";
import { RequestHandler } from "./requestHandler.js";

export class TCPServer implements IConnection<net.Server> {
  createConnection = () => {
    return net.createServer((socket: Socket) => {
      console.log("Client connected");

      socket.on("data", (data: Buffer) => {
        console.log("data recieved");
        return data;
      });

      socket.on("end", () => {
        console.log("Client disconnected");
      });
      socket.on("error", function (error: Error) {
        console.log("Socket got problems: ", error.message);
      });
    });
  };

  public sendData = (socket: Socket, data: JSON) => {
    socket.write(JSON.stringify(data));
  };
}
