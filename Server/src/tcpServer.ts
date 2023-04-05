import { IConnection, IRequestData } from "./interfaces/interfaces";
import net, { Socket } from "net";
import MethodFactory from "./methodFactory.js";

export class TCPServer implements IConnection<net.Server> {
  createConnection = () => {
    return net.createServer((socket: Socket) => {
      console.log("Client connected");

      const newRequestHandler = (methodName: string, reqBody: any) => {
        const methodFactory = new MethodFactory(methodName);
        try {
          const methodClass = methodFactory.createClass();
          return methodClass.handle(reqBody);
        } catch (e) {
          return e;
        }
      };

      socket.on("data", (data: Buffer) => {
        console.log("data recieved");
        const parsedData: IRequestData<any> = JSON.parse(data.toString());
        const res = newRequestHandler(parsedData.methodName, parsedData.body);
        socket.write(JSON.stringify(res));
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
