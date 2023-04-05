import { IClient, IRequestData } from "./interfaces.js";
import net from "net";
export class Client implements IClient {
  #client: net.Socket;
  #id: number;

  constructor(clientId: number) {
    this.#client = new net.Socket();
    this.#id = clientId;
    this.#client.on("data", (data: Buffer) => {
      console.log(data.toString());
    });
    this.#client.on("error", (err: Error) => {
      console.log(`Error: ${err.message}`);
    });
  }

  public connectToServer = () => {
    this.#client.connect(3000, "localhost", () => {
      console.log(`client${this.#id} connected`);
    });
  };

  public sendToServer =<T> (data: IRequestData<T>) => {
    this.#client.write(JSON.stringify(data));
  };
}

