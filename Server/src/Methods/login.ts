import { users } from "../db.js";
import { IMethodClass } from "../interfaces/interfaces.js";
import { ILoginData, ILoginRes } from "../interfaces/loginInterfaces.js";

export class Login implements IMethodClass<ILoginData, ILoginRes> {
  public handle = (data: ILoginData): ILoginRes => {
    const targetUser = users.find(
      (user) =>
        user.username === data.username && user.password === data.password
    );
    console.log({ targetUser });
    if (targetUser) return { msg: "successful login", token: targetUser.id };
    throw new Error("wrong user pass");
  };
}
