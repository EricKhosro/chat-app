import { IConnection, IRequestData } from "./interfaces/interfaces";
import net, { Socket } from "net";
import { newRequestHandler } from "./requestHandler.js";

export class TCPServer implements IConnection<net.Server> {
  createConnection = () => {
    return net.createServer((socket: Socket) => {
      console.log("Client connected");

      socket.on("data", (data: Buffer) => {
        console.log("data recieved");
        const parsedData: IRequestData<any> = JSON.parse(data.toString());
        let res;
        try {
          res = newRequestHandler(parsedData.methodName, parsedData.body);
        } catch (error) {
          if (error instanceof Error) res = error.message;
          else res = "UnExpected Error";
        } finally {
          socket.write(JSON.stringify(res));
        }
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
