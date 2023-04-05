import { users } from "./db.js";
import { ILoginData, IMethodClass, IPacket } from "./interfaces/interfaces";

export class Login implements IMethodClass<ILoginData> {
  public methodHandler = (data: ILoginData): IPacket<boolean> => {
    const targetUser = users.find((user) => user.username === data.username);
    if (targetUser)
      return { data: true, msg: "successful login", statusCode: 200 };
    return { data: false, msg: "wrong user pass", statusCode: 400 };
  };
}
