import { IRequestData } from "./interfaces/interfaces";
import MethodFactory from "./methodFactory.js";

export class RequestHandler {
  public deSerializeData = (data: Buffer): IRequestData<any> => {
    const parsedData = JSON.parse(data.toString());
    console.log({ parsedData });

    return parsedData;
  };

  public handle(methodName: string, body?: any) {
    const methodFactory = new MethodFactory(methodName);
    try {
      const methodClass = methodFactory.createClass();
      const res = methodClass.handle(body);
      return res;
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
