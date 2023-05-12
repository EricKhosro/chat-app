import { useState } from "react";
import TextInput from "../../Components/TextInput";
import { Message } from "../../Interfaces/messengerInterfaces";

interface ChatBoxProps {
  sendMessage: (message: string) => void;
  selectedUser: string | null;
  messages: Array<Message>;
}

const ChatBox = ({ sendMessage, selectedUser, messages }: ChatBoxProps) => {
  const [msg, setMsg] = useState<string | number>("");

  const sendMessageHandler = () => {
    sendMessage(msg.toString());
    setMsg("");
  };

  const keydownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") sendMessageHandler();
  };

  if (!selectedUser) return <>select a user to chat with</>;
  return (
    <div className=" w-full flex flex-col justify-start items-center gap-12">
      <div className="shadow-md text-purple-600 w-full text-center">
        {selectedUser}
      </div>
      <div className="w-full px-9 max-h-full overflow-y-auto">
        {messages.map((msg, index) => {
          return (
            <div
              className={`max-w-min whitespace-nowrap rounded p-5 border-2 shadow-lg mb-5 ${
                msg.senderName === localStorage.getItem("username")
                  ? "ml-auto border-purple-300"
                  : "mr-auto border-purple-800"
              }`}
              key={index}
            >
              {msg.senderName}: {msg.message}
            </div>
          );
        })}
      </div>
      <div className="mt-auto w-full flex flex-row justify-start items-center gap-4">
        <TextInput
          name=""
          onChange={(n, value) => setMsg(value)}
          value={msg}
          onKeyDown={keydownHandler}
        />
        <div
          className="border-4 border-purple-300 w-12 h-12 rounded flex justify-center items-center px-6 cursor-pointer"
          onClick={sendMessageHandler}
        >
          send
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
