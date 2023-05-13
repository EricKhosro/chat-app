import { useContext, useEffect, useState } from "react";
import { Context } from "../../App";
import { Message, Users } from "../../Interfaces/messengerInterfaces";
import UsersBox from "./UsersBox";
import ChatBox from "./ChatBox";
import { sendRequest } from "../../helper";
import { useLocation } from "react-router-dom";

const Messenger = () => {
  const { socket, serverResponse } = useContext(Context);
  const [users, setUsers] = useState<Array<Users>>([]);
  const [messages, setMessages] = useState<Array<Message>>([]);
  const [selectedUser, setSelectedUser] = useState<Users | null>(null);
  const location = useLocation();
  const myUsername = location.state.username;
  useEffect(() => {
    getUsers();
    const interval = setInterval(() => {
      getUsers();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    console.log(serverResponse);
    if (!serverResponse || !serverResponse.methodName) return;

    if (serverResponse.methodName === "getUsers") {
      setUsers(serverResponse.body.users);
      if (!serverResponse.body.users.length) setSelectedUser(null);
    }
    if (serverResponse.methodName === "sendMessage") {
      console.log(serverResponse);

      setMessages([...messages, serverResponse.body]);
    }
  }, [serverResponse]);

  const getUsers = () => {
    if (socket && socket.readyState === WebSocket.OPEN)
      socket?.send(
        JSON.stringify({
          methodName: "getUsers",
          body: {},
        })
      );
  };

  const sendMessageHandler = (message: string) => {
    if (!myUsername) return;
    sendRequest(socket, "sendMessage", {
      message,
      receiversIDs: [selectedUser?.id],
    });
    setMessages([
      ...messages,
      { message, senderName: myUsername, recieverName: selectedUser?.username },
    ]);
  };

  return (
    <div className="flex flex-row w-screen h-screen">
      <UsersBox users={users} onUserClick={setSelectedUser} />
      <ChatBox
        sendMessage={sendMessageHandler}
        selectedUser={selectedUser}
        messages={messages}
        myUsername={myUsername}
      />
    </div>
  );
};

export default Messenger;
