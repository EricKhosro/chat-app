import { IRequestData } from "./interfaces/interfaces";
import MethodFactory from "./methodFactory.js";

export class RequestHandler {
  public deSerializeData = (data: Buffer): Array<IRequestData<any>> => {
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
    return res;
  };

  public handle(methodName: string, guid: string | null, body?: any) {
    const methodFactory = new MethodFactory(methodName);
    try {
      const methodClass = methodFactory.createClass();
      console.log({ handleGuid: guid });

      const res = methodClass.handle(body, guid);
      console.log({ res });

      return res;
    } catch (error) {
      console.log("handle catch");

      if (error instanceof Error) return error.message;
      else return "UnExpected Error";
    }
  }
}
