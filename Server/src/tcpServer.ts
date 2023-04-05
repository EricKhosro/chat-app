import { IConnection } from "./interfaces/interfaces";
import net from "net";
import MethodFactory from "./methodFactory.js";

export class TCPServer implements IConnection<net.Server> {
  createConnection = () => {
    return net.createServer((socket: any) => {
      console.log("Client connected");

      const newRequestHandler = (methodName: string, reqBody: any) => {
        const methodFactory = new MethodFactory(methodName);
        const methodClass = methodFactory.createClass();
        methodClass?.methodHandler(reqBody);
      };

      socket.on("data", (data: Buffer) => {
        console.log("data recieved");
        const stringifiedData = data.toString();
        const dataParts = stringifiedData.split("|");
        const method = dataParts[0];
        const reqBody = JSON.parse(dataParts[1]);
        newRequestHandler(method, reqBody);
      });

      socket.on("end", () => {
        console.log("Client disconnected");
      });
      socket.on("error", function (error: Error) {
        console.log("Socket got problems: ", error.message);
      });
    });
  };
}
