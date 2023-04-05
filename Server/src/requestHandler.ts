import MethodFactory from "./methodFactory.js";

export const newRequestHandler = (methodName: string, reqBody: any) => {
  if (!methodName) throw new Error("method name was not provided");

  const methodFactory = new MethodFactory(methodName);
  try {
    const methodClass = methodFactory.createClass();
    return methodClass.handle(reqBody);
  } catch (error) {
    if (error instanceof Error) return error.message;
    else return "UnExpected Error";
  }
};
