import { Client } from "./client.js";
import * as readline from "readline";

const client1 = new Client("ali");
client1.connectToServer();
// client1.login("user1", "123");
// client1.getUsers();
// client1.sendMessage("salam amir");
// const client2 = new Client("amir");

// client2.connectToServer();
// client2.login("user2", "321");

// client2.getUsers();

// client2.sendMessage("salam ali");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const continueChattingExitHandler = (command: string, guid: string) => {
  switch (command) {
    case "1":
      {
        rl.question("Enter your message: ", (message: string) => {
          client1.sendMessage(message, guid, [
            client1.getCurrentChatId() || "-1",
          ]);
          setPromptsToContinueChatting(guid);
        });
      }
      break;
    case "2": {
      setPromptsToSendMsg(guid);
    }

    default:
      break;
  }
};

const setPromptsToContinueChatting = (guid: string) => {
  rl.removeAllListeners("line");
  rl.on("line", (input: string) => {
    continueChattingExitHandler(input.trim(), guid);
  });
  rl.setPrompt(`
      1)continue chatting 
      2)exit
      `);
  rl.prompt();
};

const chatAndExitHandler = (command: string, guid: string): void => {
  switch (command) {
    case "1": {
      rl.question("Enter the user ID: ", (userId: string) => {
        client1.setCurrentChatId(userId);
        rl.question("Enter your message: ", (message: string) => {
          client1.sendMessage(message, guid, [
            client1.getCurrentChatId() || "-1",
          ]);

          setPromptsToContinueChatting(guid);
        });
      });
      break;
    }
    case "2": {
      client1.getUsers();
      client1.serverResponseHandler.getUsers().then((res) => {
        console.log("other users: ");
        console.log(res);
        setPromptsToSendMsg(guid);
      });
    }

    default:
      break;
  }
};

const setPromptsToSendMsg = (guid: string) => {
  rl.removeAllListeners("line");
  rl.on("line", (input: string) => {
    chatAndExitHandler(input.trim(), guid);
  });
  rl.setPrompt(`
  1)send message 
  2)getUsers
  `);
  rl.prompt();
};

function loginAndExitHandler(command: string): void {
  switch (command) {
    case "1": {
      rl.question("Enter your username: ", (username: string) => {
        rl.question("Enter your password: ", (password: string) => {
          client1.login(username, password);
          client1.serverResponseHandler.getGuid().then((res) => {
            if (res.guid === "-1") {
              rl.setPrompt(`
              1)login 
              2)exit
              `);
              rl.prompt();
            } else {
              setPromptsToSendMsg(res.guid);
            }
          });
        });
      });
      break;
    }

    default:
      break;
  }
}

rl.on("line", (input: string) => {
  loginAndExitHandler(input.trim());
});

rl.on("close", () => {
  console.log("Exiting terminal...");
});

rl.setPrompt(`
1)login
2)exit
>`);
rl.prompt();
