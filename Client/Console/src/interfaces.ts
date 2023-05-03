export interface IRequestData<T> {
  methodName: string;
  body: T;
}
export interface IClient {
  connectToServer: () => void;
  // sendToServer: (data: IRequestData<any>) => void;
  login: (username: string, password: string) => void;
  getUsers: () => void;
}

export interface ILoginData {
  username: string;
  password: string;
}

export interface ILoginResponse {
  token: string;
  message: string;
}

export interface IFriends {
  username: string;
  id: string | null;
}

export interface IGetUsersResponse {
  users: Array<IFriends>;
}

export interface IUserID {
  id: number;
}

export interface GetUsersDTO {}

export interface SendMessageDTO {
  receiversIDs: Array<string | null>;
  message: string;
  senderName: string;
}
