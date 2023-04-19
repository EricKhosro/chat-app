import {
  GetUsersDTO,
  IClient,
  ILoginData,
  IRequestData,
  SendMessageDTO,
} from "./interfaces.js";
import net from "net";
import { ServerResponseHandler } from "./serverResponseHandler.js";

export class Client implements IClient {
  #client: net.Socket;
  #name: string;

  #serverResponseHandler = new ServerResponseHandler();
  constructor(clientName: string) {
    this.#client = new net.Socket();
    this.#name = clientName;
    this.#client.on("data", (data: Buffer) => {
      // console.log(data.toString());
      this.#serverResponseHandler.deserialize(data);
      this.#serverResponseHandler.handle();
    });
    this.#client.on("error", (err: Error) => {
      console.log(`Error: ${err.message}`);
    });
  }

  public connectToServer = () => {
    this.#client.connect(3000, "localhost", () => {
      console.log(`${this.#name} connected`);
    });
  };

  #sendToServer = <T>(data: IRequestData<T>) => {
    this.#client.write(JSON.stringify(data));
  };

  public login = (username: string, password: string) => {
    this.#sendToServer<ILoginData>({
      methodName: "login",
      body: {
        username,
        password,
      },
    });
  };

  public getUsers = () => {
    const guid = this.#serverResponseHandler.getGuid();
    if (guid) {
      this.#sendToServer<GetUsersDTO>({
        methodName: "getUsers",
        body: {},
      });
    } else {
      const myInterval = setInterval(() => {
        if (this.#serverResponseHandler.getGuid()) {
          this.getUsers();
          clearInterval(myInterval);
        }
      }, 1000);
    }
  };

  public sendMessage = (message: string, receiversIDs?: Array<string>) => {
    //if !receiversIds send to all active users
    let finalReceiversIDs: Array<string> = [];

    const guid = this.#serverResponseHandler.getGuid();

    if (guid) {
      if (receiversIDs) finalReceiversIDs = receiversIDs;
      else {
        if (this.#serverResponseHandler.getUsers().length) {
          this.#serverResponseHandler.getUsers().map((user) => {
            if (user.id && user.id !== guid) finalReceiversIDs.push(user.id);
          });

          this.#sendToServer<SendMessageDTO>({
            methodName: "sendMessage",
            body: {
              message,
              receiversIDs: finalReceiversIDs,
              senderName: this.#name,
            },
          });
        } else {
          const myInterval = setInterval(() => {
            if (this.#serverResponseHandler.getUsers().length) {
              this.sendMessage(message, receiversIDs);
              clearInterval(myInterval);
            }
          }, 1000);
        }
      }
    } else {
      const myInterval = setInterval(() => {
        if (this.#serverResponseHandler.getGuid()) {
          this.sendMessage(message, receiversIDs);
          clearInterval(myInterval);
        }
      }, 1000);
    }
  };
}