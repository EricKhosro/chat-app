import {
  IFriends,
  IGetUsersResponse,
  ILoginResponse,
  IRequestData,
  SendMessageDTO,
} from "./interfaces";

export class ServerResponseHandler {
  #guid: string | null = null;
  #data: Array<IRequestData<any>> = [];
  #users: Array<IFriends> | null = null;

  public deserialize = (data: Buffer) => {
    const res: Array<IRequestData<any>> = [];
    try {
      res.push(JSON.parse(data.toString()));
    } catch {
      const splittedData: Array<string> = data.toString().split("}{");

      splittedData.forEach((element, index) => {
        if (index % 2 === 0) splittedData[index] = element + "}";
        else splittedData[index] = "{" + element;
        res.push(JSON.parse(splittedData[index]));
      });
    }

    this.#data = res;
  };

  public handle = () => {
    this.#data.map((j) => {
      switch (j.methodName) {
        case "login":
          this.#loginHandler(j.body);
          break;
        case "getUsers":
          this.#getUsersHandler(j.body);
          break;
        case "sendMessage":
          this.#sendMessageHandler(j.body);
          break;
        default:
          break;
      }
    });
  };

  #loginHandler = (values: ILoginResponse) => {
    console.log({ loginValues: values });

    this.#guid = values.token;
  };

  public resetGuid = () => (this.#guid = null);

  public getGuid = (): Promise<{ guid: string }> =>
    new Promise((resolve, reject) => {
      if (this.#guid) {
        resolve({ guid: this.#guid });
      } else {
        const intervalId = setInterval(() => {
          if (this.#guid) {
            clearInterval(intervalId);
            resolve({ guid: this.#guid });
          }
        }, 500);
      }
    });

  #getUsersHandler = (values: IGetUsersResponse) => {
    console.log("other users: ");
    const res: Array<IFriends> = [];
    values.users.map((u) => {
      if (u.id !== this.#guid) {
        res.push(u);
        console.log(u);
      }
    });
    this.#users = res;
  };

  public getUsers = (): Promise<{ users: Array<IFriends> }> =>
    new Promise((resolve, reject) => {
      if (this.#users) resolve({ users: this.#users });
      else {
        const intervalId = setInterval(() => {
          if (this.#users) {
            clearInterval(intervalId);
            resolve({ users: this.#users });
          }
        }, 500);
      }
    });

  #sendMessageHandler = (values: SendMessageDTO) => {
    console.log({ sendMessageValues: values });

    console.log(`${values.senderName}: ${values.message}`);
  };
}
