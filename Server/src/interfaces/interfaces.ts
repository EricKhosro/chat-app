export interface IPacket<T> {
  msg: string;
  errorCode?: number;
  statusCode: number;
  data: T;
}

export interface IMethodClass<T> {
  methodHandler: (data: T) => IPacket<boolean>;
}

export interface IMethodFactory<T> {
  createClass: (className: string) => IMethodClass<T> | null;
}

export interface IRequestBody {
  id: number;
}

export interface ILoginData extends IRequestBody {
  username: string;
  password: string;
}

export interface IConnection<T> {
  createConnection: () => T;
}
