import { IMethodClass, IMethodFactory } from "./interfaces/interfaces";
import { Login } from "./login.js";

export default class MethodFactory implements IMethodFactory<any> {
  #methodName: string;
  constructor(methodName: string) {
    this.#methodName = methodName;
  }

  public createClass = (): IMethodClass<any> | null => {
    switch (this.#methodName) {
      case "login":
        return new Login();

      default: {
        console.log("invalid method name!");
        return null;
      }
    }
  };
}
