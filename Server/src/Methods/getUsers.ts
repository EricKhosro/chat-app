import { Database } from "../db.js";
import { GetUsersDTO, IGetUsersData } from "../interfaces/getUsersInterface";
import { IFriends, IMethodClass } from "../interfaces/interfaces.js";

export class GetUsers
  implements IMethodClass<GetUsersDTO | undefined, Array<IFriends>>
{
  public handle = (data: GetUsersDTO | undefined) => {
    const db = new Database();
    const res: Array<IFriends> = [];
    db.getUsersByID().forEach((user) => {
      data?.users.forEach((data) => {
        if (data.id !== user.id)
          res.push({ id: user.id, username: user.username });
      });
    });
    return res;
  };
}
