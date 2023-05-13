import { IMethodClass, IMethodFactory } from "./interfaces/interfaces";
import { GetUsers } from "./Methods/getUsers.js";
import { Login } from "./Methods/login.js";
import { RegisterUser } from "./Methods/registerUser.js";
import { SendMessage } from "./Methods/sendMessage.js";

export default class MethodFactory implements IMethodFactory<any, any> {
  #methodName: string;
  constructor(methodName: string) {
    this.#methodName = methodName;
  }

  public createClass = (): IMethodClass<any, any> => {
    switch (this.#methodName) {
      case "login":
        return new Login();
      case "getUsers":
        return new GetUsers();
      case "sendMessage":
        return new SendMessage();
      case "registerUser":
        return new RegisterUser();
      default: {
        throw new Error("invalid method name");
      }
    }
  };
}
