import { useContext, useEffect } from "react";
import { Context } from "../App";

const Messenger = () => {
  const { socket, serverResponse } = useContext(Context);

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(()=>{
    if (!serverResponse || serverResponse.methodName !== "getUsers") return;
    console.log(serverResponse);
    
  },[serverResponse])

  const getUsers = () => {
    if (socket && socket.readyState === WebSocket.OPEN)
      socket?.send(
        JSON.stringify({
          methodName: "getUsers",
          body: {},
        })
      );
  };

  return <div>Messenger</div>;
};

export default Messenger;
