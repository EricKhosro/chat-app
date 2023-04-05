import { IFriends } from "./interfaces";

export interface IGetUsersData {
  id: number;
}
export interface IGetUsersRes {
  users: Array<IFriends>;
}
