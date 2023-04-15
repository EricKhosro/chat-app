import { Client } from "./client.js";
import { GetUsersDTO, ILoginData } from "./interfaces";

const client1 = new Client(1);

// client1.connectToServer();
// client1.sendToServer<ILoginData>({
//   methodName: "login",
//   body: {
//     username: "user1",
//     password: "123",
//   },
// });

const client2 = new Client(2);

client2.connectToServer();
client2.sendToServer<ILoginData>({
  methodName: "login",
  body: {
    username: "user2",
    password: "321",
  },
});

client2.sendToServer<GetUsersDTO>({
  methodName: "getUsers",
  body: {
    users: [{ id: 2 }],
  },
});
