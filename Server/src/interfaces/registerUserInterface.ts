import { IResponse } from "./interfaces";

export interface RegisterInput {
  username: string;
  name: string;
  password: string;
}

export interface RegisterResponse extends IResponse {
  body: {
    msg: string;
    data: boolean;
  };
}
