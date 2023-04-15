import { IGetUsersData } from "./interfaces/getUsersInterface";
import { IUser } from "./interfaces/interfaces";

export class Database {
  #users: Array<IUser> = [
    { username: "user1", password: "123", id: 1 },
    { username: "user2", password: "321", id: 2 },
  ];

  public getUsersByID = (userIds?: Array<IGetUsersData>) => {
    if (!userIds) return this.#users;
    const res: Array<IUser> = [];
    userIds.forEach((uId) => {
      
      const targetUser = this.#users.find((u) => {
        return u.id === uId.id;
      });
      if (targetUser) res.push(targetUser);
    });
    return res;
  };

  public getUsersByUsername = (usernames: Array<string>) => {
    const res: Array<IUser> = [];
    usernames.forEach((username) => {
      const targetUser = this.#users.find((u) => {
        return username === u.username;
      });
      if (targetUser) res.push(targetUser);
    });
    return res;
  };

  public setUser = (user: IUser) => this.#users.push(user);
}
