import { IFriends, IResponse } from "./interfaces";

export interface GetUsersDTO {
  users: Array<IGetUsersData>;
}
export interface IGetUsersData {
  id: number;
}
export interface IGetUsersRes extends IResponse {
  users: Array<IFriends>;
}
