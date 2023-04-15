import { IFriends } from "./interfaces";

export interface GetUsersDTO {
  users: Array<IGetUsersData>;
}
export interface IGetUsersData {
  id: number;
}
export interface IGetUsersRes {
  users: Array<IFriends>;
}
