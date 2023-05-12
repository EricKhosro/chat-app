import { useContext, useEffect, useState } from "react";
import { Context } from "../../App";
import { Message, Users } from "../../Interfaces/messengerInterfaces";
import UsersBox from "./UsersBox";
import ChatBox from "./ChatBox";
import { sendRequest } from "../../helper";
const Messenger = () => {
  const { socket, serverResponse } = useContext(Context);
  const [users, setUsers] = useState<Array<Users>>([]);
  const [messages, setMessages] = useState<Array<Message>>([]);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    console.log(serverResponse);
    if (!serverResponse || !serverResponse.methodName) return;

    if (serverResponse.methodName === "getUsers")
      setUsers(serverResponse.body.users);
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
    const username = localStorage.getItem("username");
    if (!username) return;
    sendRequest(socket, "sendMessage", {
      message,
      receiversIDs: [selectedUser],
    });
    setMessages([...messages, { message, senderName: username }]);
  };

  return (
    <div className="flex flex-row w-screen h-screen">
      <UsersBox users={users} onUserClick={setSelectedUser} />
      <ChatBox
        sendMessage={sendMessageHandler}
        selectedUser={selectedUser}
        messages={messages}
      />
    </div>
  );
};

export default Messenger;
