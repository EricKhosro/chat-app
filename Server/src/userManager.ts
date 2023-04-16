import { IGetUsersData } from "./interfaces/getUsersInterface";
import { IFriends, IUser } from "./interfaces/interfaces";

export class UserManager {
  #users: Array<IUser> = [
    { username: "user1", password: "123", id: null },
    { username: "user2", password: "321", id: null },
  ];

  public getUsersByID = (userIds?: Array<string>) => {
    if (!userIds) return this.#users;
    const res: Array<IUser> = [];
    userIds.forEach((uId) => {
      const targetUser = this.#users.find((u) => {
        return u.id === uId;
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

  public getFriends = () => {
    const friends: Array<IFriends> = [];
    this.#users.forEach((user) => {
      friends.push({ username: user.username, id: user.id || null });
    });
    return friends;
  };

  public addUser = (user: IUser) => this.#users.push(user);

  public updateUserId = (user: IUser, newId: string | null) => {
    this.#users.forEach((u) => {
      if (user.username && user.password)
        if (user.username === u.username && user.password === u.password)
          u.id = newId;
      if (user.id) if (user.id === u.id) u.id = newId;
    });
  };
}
