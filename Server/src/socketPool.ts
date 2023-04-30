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

  public removeRegisteredSocket = (guid: string) => {
    const disconnectedSocketIndex = this.#registeredSockets.findIndex(
      (socket) => socket.guid === guid
    );
    if (!disconnectedSocketIndex) return console.log("Didn't Find The Socket");
    this.#registeredSockets.splice(disconnectedSocketIndex, 1);
    console.log(`guid:${guid} was deleted`);
  };
}
