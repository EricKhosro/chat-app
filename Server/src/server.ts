import { TCPServer } from "./tcpServer.js";

const server = new TCPServer().createConnection();

server.listen(3000, () => {
  console.log("Server listening on port 3000");
});
