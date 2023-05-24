import { useState, Fragment } from "react";
import { Message, Users } from "../../Interfaces/messengerInterfaces";
import MultiLineTextInput from "../../Components/MultiLineTextInput";

interface ChatBoxProps {
  sendMessage: (message: string) => void;
  selectedUser: Users | null;
  messages: Array<Message>;
  myUsername: string;
}

const ChatBox = ({
  sendMessage,
  selectedUser,
  messages,
  myUsername,
}: ChatBoxProps) => {
  const [msg, setMsg] = useState<string | number>("");

  const sendMessageHandler = () => {
    sendMessage(msg.toString());
    setMsg("");
  };

  const keydownHandler = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // if (e.key === "Enter") sendMessageHandler();
    if (e.keyCode === 13 && e.ctrlKey) sendMessageHandler();
  };

  if (!selectedUser)
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <div className="m-auto">select a user to chat with</div>
      </div>
    );
  return (
    <div className="w-full flex flex-col justify-start items-center gap-12">
      <div className="shadow-md text-purple-600 w-full text-center">
        {selectedUser.username}
      </div>
      <div className="w-full px-9 max-h-full overflow-y-auto">
        {messages.map((msg, index) => {
          if (
            msg.senderName === selectedUser.username ||
            msg.recieverName === selectedUser.username
          ) {
            return (
              <div
                className={`max-w-min whitespace-nowrap rounded p-5 border-2 shadow-lg mb-5 ${
                  msg.senderName === myUsername
                    ? "ml-auto border-purple-300"
                    : "mr-auto border-purple-800"
                }`}
                key={index}
              >
                <div className="flex flex-row justify-start items-start gap-5">
                  <div>{msg.senderName}:</div>
                  <div>
                    {msg.message.includes("\n")
                      ? msg.message.split("\n").map((line, index) => {
                          return (
                            <Fragment key={index}>
                              {line}
                              <br />
                            </Fragment>
                          );
                        })
                      : msg.message}
                  </div>
                </div>
              </div>
            );
          }
          return null;
        })}
      </div>
      <div className="mt-auto w-full flex flex-row justify-start items-center gap-4 px-5 mb-1">
        <MultiLineTextInput
          placeholder="message"
          name=""
          onChange={(n, value) => {
            n = n + 1;
            setMsg(value);
          }}
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
