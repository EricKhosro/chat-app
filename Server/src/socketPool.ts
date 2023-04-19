import { IRegisteredSocket } from "./interfaces/interfaces";

export class SocketPool {
  #registeredSockets: Array<IRegisteredSocket> = [];

  public getRegisteredSockets = (socketIds: Array<string | null>) => {
    if (socketIds.length === 0) throw new Error("Nobody is online");
    const res: Array<IRegisteredSocket> = [];
    socketIds.forEach((sId) => {
      if (sId) {
        const targetSocket = this.#registeredSockets.find((u) => {
          return u.guid === sId;
        });
        if (targetSocket) res.push(targetSocket);
      }
    });
    return res;
  };

  public setRegisteredSockets = (registerSocket: IRegisteredSocket) => {
    this.#registeredSockets.push(registerSocket);
    console.log(this.#registeredSockets);
  };
}
