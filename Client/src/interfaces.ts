export interface IRequestData<T> {
  methodName: string;
  body: T;
}
export interface IClient {
  connectToServer: () => void;
  sendToServer: (data: IRequestData<any>) => void;
}

export interface ILoginData {
  username: string;
  password: string;
}

export interface IGetUsersData {
  id: number;
}
