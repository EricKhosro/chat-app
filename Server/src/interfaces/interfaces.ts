import { Socket } from "net";

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

export interface IServer {
  createServer: () => void;
  setOnNewSocket: (onNewSocket: (socket: ISocket) => void) => void;
  startListening: (port: number, host: string) => void;
}

export interface ISocketEvents {
  onData: (data: Buffer) => void;
  onDisconnect: () => void;
  onError: (error: Error) => void;
}

export interface ISocket {
  setEvents: (events: ISocketEvents) => void;
  sendData: (data: Buffer) => void;
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

export interface ISocketHandler {
  registerSocker: (socket: ISocket) => void;
}

export interface IRegisteredSocket {
  socket: ISocket;
  guid: string;
}
