import { UserManager } from "../userManager.js";
import { IMethodClass } from "../interfaces/interfaces.js";
import { ILoginData, ILoginRes } from "../interfaces/loginInterfaces.js";

export class Login implements IMethodClass<ILoginData, ILoginRes> {
  public handle = (data: ILoginData, guid: string | null): ILoginRes => {
    const userManager = new UserManager();

    const targetUser = userManager
      .getUsersByUsername([data.username])
      .find(
        (user) =>
          user.username === data.username && user.password === data.password
      );

    if (targetUser) {
      userManager.updateUserId(
        { username: data.username, password: data.password, id: null },
        guid
      );
      return {
        methodname: "login",
        msg: "successful login",
        token: guid || "-1",
      };
    }
    throw new Error("wrong user pass");
  };
}

