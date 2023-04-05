import { users } from "../db.js";
import { IGetUsersData, IGetUsersRes } from "../interfaces/getUsersInterface";
import { IFriends, IMethodClass } from "../interfaces/interfaces.js";

export class GetUsers implements IMethodClass<IGetUsersData, IGetUsersRes> {
  public handle = (data: IGetUsersData): IGetUsersRes => {
    const friends: Array<IFriends> = [];
    users.forEach((user) => {
      if (data.id !== user.id)
        friends.push({ username: user.username, id: user.id });
    });
    return { users: friends };
  };
}
