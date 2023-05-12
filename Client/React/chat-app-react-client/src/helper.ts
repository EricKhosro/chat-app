export const sendRequest = (
  socket: WebSocket | null,
  methodName: string,
  body: any
) => {
  if (socket && socket.readyState === WebSocket.OPEN)
    socket?.send(
      JSON.stringify({
        methodName,
        body,
      })
    );
};
