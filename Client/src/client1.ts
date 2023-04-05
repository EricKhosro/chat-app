import net from "net";

const client1 = new net.Socket();

client1.connect(3000, "localhost", () => {
  console.log("client1 connected");
});
client1.on("error", (err: Error) => {
  console.log(`Error: ${err.message}`);
});
client1.write(`login|"{'user':'user1','pass':123,'id':1}"`);
