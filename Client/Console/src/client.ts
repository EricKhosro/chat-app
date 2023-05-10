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
  // #name: string;
  #currentChatId: string | null = null;

  serverResponseHandler = new ServerResponseHandler();
  constructor(clientName: string) {
    this.#client = new net.Socket();
    // this.#name = clientName;
    this.#client.on("data", (data: Buffer) => {
      // console.log(data.toString());
      this.serverResponseHandler.deserialize(data);
      this.serverResponseHandler.handle();
    });
    this.#client.on("error", (err: Error) => {
      console.log(`Error: ${err.message}`);
    });
  }

  public connectToServer = () => {
    this.#client.connect(3000, "0.0.0.0", () => {
      console.log(`you're connected`);
    });
  };

  public setCurrentChatId = (value: string | null) => {
    this.#currentChatId = value;
  };

  public getCurrentChatId = () => this.#currentChatId;

  #sendToServer = <T>(data: IRequestData<T>) => {
    this.#client.write(JSON.stringify(data));
  };

  public login = (username: string, password: string) => {
    this.serverResponseHandler.resetGuid();
    this.#sendToServer<ILoginData>({
      methodName: "login",
      body: {
        username,
        password,
      },
    });
  };

  public getUsers = () => {
    this.serverResponseHandler.getGuid().then((res) => {
      if (!res || res.guid === "-1") return console.log("invalid token");

      this.#sendToServer<GetUsersDTO>({
        methodName: "getUsers",
        body: {},
      });
    });
  };

  public sendMessage = (
    message: string,
    guid: string,
    receiversIDs?: Array<string>
  ) => {
    //if !receiversIds send to all active users
    let finalReceiversIDs: Array<string> = [];
    console.log({ message, receiversIDs });

    if (receiversIDs) {
      finalReceiversIDs = receiversIDs;
      this.#sendToServer<SendMessageDTO>({
        methodName: "sendMessage",
        body: {
          message,
          receiversIDs: finalReceiversIDs,
          senderName: guid,
        },
      });
    } else {
      this.serverResponseHandler.getUsers().then((getUsersRes) => {
        if (!getUsersRes || !getUsersRes.users)
          return console.log("no other user is online");

        getUsersRes.users.map((user) => {
          if (user.id && user.id !== guid) finalReceiversIDs.push(user.id);
        });
      });

      this.#sendToServer<SendMessageDTO>({
        methodName: "sendMessage",
        body: {
          message,
          receiversIDs: finalReceiversIDs,
          senderName: guid,
        },
      });
    }
  };
}
