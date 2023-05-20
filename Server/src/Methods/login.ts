import { UserManager } from "../userManager.js";
import { IMethodClass } from "../interfaces/interfaces.js";
import { ILoginData, ILoginRes } from "../interfaces/loginInterfaces.js";

export class Login implements IMethodClass<ILoginData, ILoginRes> {
  public handle = (data: ILoginData, guid: string | null): ILoginRes => {
    const targetUser = UserManager.getInstance()
      .getUsersByUsername([data.username])
      .find(
        (user) =>
          user.username === data.username && user.password === data.password
      );
    console.log({ targetUser });

    if (targetUser) {
      if (!targetUser.id) {
        UserManager.getInstance().updateUserId(
          { username: data.username, password: data.password, id: null },
          guid
        );
        console.log({ targetUser });

        return {
          methodName: "login",
          body: {
            msg: "successful login",
            token: guid || "",
            data: true,
          },
        };
      }
      return {
        methodName: "login",
        body: {
          msg: `${targetUser.username} is already logged in`,
          token: "-1",
          data: false,
        },
      };
    }
    return {
      methodName: "login",
      body: {
        msg: "wrong user pass",
        token: "-1",
        data: false,
      },
    };
  };
}
