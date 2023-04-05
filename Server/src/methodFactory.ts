import { IMethodClass, IMethodFactory } from "./interfaces/interfaces";
import { Login } from "./login.js";

export default class MethodFactory implements IMethodFactory<any> {
  #methodName: string;
  constructor(methodName: string) {
    this.#methodName = methodName;
  }

  public createClass = (): IMethodClass<any> => {
    switch (this.#methodName) {
      case "login":
        return new Login();

      default: {
        throw new Error("invalid method name");
      }
    }
  };
}
