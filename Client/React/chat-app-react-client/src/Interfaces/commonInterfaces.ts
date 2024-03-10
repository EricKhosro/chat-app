export interface ServerResponse {
  methodName: string;
  body: any;
}

export interface IContext {
  serverResponse: ServerResponse;
  setServerResponse: (value: ServerResponse) => void;
  isConnected: boolean;
}
