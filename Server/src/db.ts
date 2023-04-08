import { IUser } from "./interfaces/interfaces";

export const users: Array<IUser> = [
  { username: "user1", password: "123", id: 1 },
  { username: "user2", password: "321", id: 2 },
];
export class DataBase {
  #users: Array<IUser> = [
    { username: "user1", password: "123", id: 1 },
    { username: "user2", password: "321", id: 2 },
  ];

  public getUsers = () => this.#users;

  public setUser = (user: IUser) => {
    const targetUser = users.find((u) => {
      return u.id === user.id;
    });
    
  };
}
