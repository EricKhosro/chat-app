export interface ServerResponse {
  methodName: string;
  body: any;
}

export interface IContext {
  socket: WebSocket | null;
  serverResponse: ServerResponse;
  setServerResponse: (value: ServerResponse) => void;
  isConnected: boolean;
}
