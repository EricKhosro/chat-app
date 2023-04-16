import { UserManager } from "../userManager.js";
import { IGetUsersRes } from "../interfaces/getUsersInterface";
import { IMethodClass } from "../interfaces/interfaces.js";

export class GetUsers implements IMethodClass<{}, IGetUsersRes> {
  public handle = (): IGetUsersRes => {
    const userManager = new UserManager();
    return { methodname: "getUsers", users: userManager.getFriends() };
  };
}
