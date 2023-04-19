import { Client } from "./client.js";

const client1 = new Client("ali");
client1.connectToServer();
client1.login("user1", "123");
client1.getUsers();
client1.sendMessage("salam amir");
const client2 = new Client("amir");

client2.connectToServer();
client2.login("user2", "321");

client2.getUsers();

client2.sendMessage("salam ali");



