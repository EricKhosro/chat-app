import MethodFactory from "./methodFactory.js";

export class RequestHandler {
  #methodName: string;
  #body: any;

  constructor(methodName: string, body: any) {
    this.#methodName = methodName;
    this.#body = body;
  }

  public handle() {
    const methodFactory = new MethodFactory(this.#methodName);
    try {
      const methodClass = methodFactory.createClass();
      return methodClass.handle(this.#body);
    } catch (error) {
      if (error instanceof Error) return error.message;
      else return "UnExpected Error";
    }
  }
}

// const parsedData: IRequestData<any> = JSON.parse(data.toString());
// let res;
// try {
//   res = new RequestHandler(parsedData.methodName, parsedData.body);
// } catch (error) {
//   if (error instanceof Error) res = error.message;
//   else res = "UnExpected Error";
// } finally {
//   socket.write(JSON.stringify(res));
// }
