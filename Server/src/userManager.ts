import { IFriends, IUser } from "./interfaces/interfaces";

export class UserManager {
  private static instance: UserManager;

  private constructor() {}

  public static getInstance(): UserManager {
    if (!UserManager.instance) {
      UserManager.instance = new UserManager();
    }

    return UserManager.instance;
  }

  #users: Array<IUser> = [
    { username: "user1", password: "123", id: null },
    { username: "user2", password: "321", id: null },
    { username: "user3", password: "321", id: null },
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

  public getName = (guid: string): string => {
    const targetUser = this.#users.find((u) => u.id === guid);
    return targetUser?.username || "";
  };

  public getFriends = (guid: string | null) => {
    const friends: Array<IFriends> = [];
    this.#users.forEach((user) => {
      if (!guid) friends.push({ username: user.username, id: user.id });
      else if (user.username !== UserManager.getInstance().getName(guid))
        friends.push({ username: user.username, id: user.id });
    });
    return friends;
  };

  public getOnlineFriends = (guid: string | null) => {
    const friends: Array<IFriends> = [];
    this.#users.forEach((user) => {
      if (!guid) {
        if (user.id) friends.push({ username: user.username, id: user.id });
      } else if (
        user.username !== UserManager.getInstance().getName(guid) &&
        user.id
      )
        friends.push({ username: user.username, id: user.id });
    });
    console.log({ friends });

    return friends;
  };

  public addUser = (user: IUser) => {
    this.#users.forEach((u) => {
      if (u.username === user.username)
        throw new Error(`username is already taken`);
    });
    this.#users.push(user);
  };

  public updateUserId = (user: IUser, newId: string | null) => {
    this.#users.forEach((u) => {
      if (user.username && user.password) {
        if (user.username === u.username && user.password === u.password)
          u.id = newId;
      } else if (user.id) if (user.id === u.id) u.id = newId;
    });
  };

  public logoutUser = (guid: string) => {
    console.log({ logoutGuid: guid });

    this.#users.forEach((u) => {
      console.log(u.id);
      if (u.id === guid) {
        u.id = null;
        console.log(`${u.username} logged out`);
      }
    });
  };
}
