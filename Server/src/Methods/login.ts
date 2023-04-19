import { UserManager } from "../userManager.js";
import { IMethodClass } from "../interfaces/interfaces.js";
import { ILoginData, ILoginRes } from "../interfaces/loginInterfaces.js";

export const globalUserManager = new UserManager();
export class Login implements IMethodClass<ILoginData, ILoginRes> {
  public handle = (data: ILoginData, guid: string | null): ILoginRes => {
    const targetUser = globalUserManager
      .getUsersByUsername([data.username])
      .find(
        (user) =>
          user.username === data.username && user.password === data.password
      );

    if (targetUser) {
      globalUserManager.updateUserId(
        { username: data.username, password: data.password, id: null },
        guid
      );
      console.log({ users: globalUserManager.getFriends() });

      return {
        methodName: "login",
        body: {
          msg: "successful login",
          token: guid || "-1",
        },
      };
    }
    throw new Error("wrong user pass");
  };
}


