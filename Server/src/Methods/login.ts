import { users } from "../db";
import { IMethodClass } from "../interfaces/interfaces";
import { ILoginData, ILoginRes } from "../interfaces/loginInterfaces";

export class Login implements IMethodClass<ILoginData> {
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
