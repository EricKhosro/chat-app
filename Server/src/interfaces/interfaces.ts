export interface IPacket<T> {
  msg: string;
  errorCode?: number;
  statusCode: number;
  data: T;
}

export interface IMethodClass<T> {
  handle: (data: T) => any;
}

export interface IMethodFactory<T> {
  createClass: (className: string) => IMethodClass<T> | null;
}

export interface IRequestData<T> {
  methodName: "string";
  body: T;
}

export interface IConnection<T> {
  createConnection: () => T;
}

export interface IUser {
  username: string;
  password: string;
  id: number;
}
