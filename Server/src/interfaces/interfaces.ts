export interface IPacket<T> {
  msg: string;
  errorCode?: number;
  statusCode: number;
  data: T;
}

export interface IMethodClass<Input, Output> {
  handle: (data: Input, guid: string | null) => Output;
}

export interface IMethodFactory<Input, Output> {
  createClass: (className: string) => IMethodClass<Input, Output> | null;
}

export interface IRequestData<T> {
  methodName: string;
  body: T;
}

export interface IServer {
  createServer: () => void;
  setOnNewSocket: (onNewSocket: (socket: ISocket) => void) => void;
  startListening: (port: number, host: string) => void;
  setEvents: (events: ISocketEvents) => void;
}

export interface ISocketEvents {
  onData: (data: Buffer, guid: string | null) => Array<IRequestData<any>>;
  onDisconnect: (guid: string | null) => void;
  onError: (error: Error, guid: string | null) => void;
}

export interface ISocket {
  setEvents: (events: ISocketEvents) => void;
  sendData: (data: any) => void;
  setGuid: (guid: string) => void;
  getGuid: () => string | null;
}

export interface IFriends {
  username: string;
  id: string | null;
}

export interface IUser {
  username: string;
  password: string;
  id: string | null;
}

export interface ISocketHandler {
  registerSocker: (socket: ISocket) => void;
}

export interface IRegisteredSocket {
  socket: ISocket;
  guid: string;
}

export interface IResponse {
  methodName: string;
}
