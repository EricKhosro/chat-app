import { IGetUsersRes } from "../interfaces/getUsersInterface";
import { IMethodClass } from "../interfaces/interfaces.js";
import { globalUserManager } from "./login.js";

export class GetUsers implements IMethodClass<{}, IGetUsersRes> {
  public handle = (data: {}, guid: string | null): IGetUsersRes => {
    return {
      methodName: "getUsers",
      body: { users: globalUserManager.getOnlineFriends(guid) },
    };
  };
}
