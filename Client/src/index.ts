import { Client } from "./client.js";

const client1 = new Client(1);
client1.connectToServer();
client1.login("user1", "123");

const client2 = new Client(2);

client2.connectToServer();
client2.login("user2", "321");

client2.getUsers();








