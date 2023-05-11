import { IResponse } from "./interfaces";

export interface ILoginData {
  username: string;
  password: string;
}

export interface ILoginRes extends IResponse {
  body: {
    token: string;
    msg: string;
    data: boolean;
  };
}
