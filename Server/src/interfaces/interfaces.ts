export interface IPacket<T> {
  msg: string;
  errorCode?: number;
  statusCode: number;
  data: T;
}

export interface IMethodClass<Input, Output> {
  handle: (data: Input) => Output;
}

export interface IMethodFactory<Input, Output> {
  createClass: (className: string) => IMethodClass<Input, Output> | null;
}

export interface IRequestData<T> {
  methodName: string;
  body: T;
}

export interface IConnection<T> {
  createConnection: () => T;
}

export interface IFriends {
  username: string;
  id: number;
}

export interface IUser {
  username: string;
  password: string;
  id: number;
}
