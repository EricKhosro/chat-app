import { useNavigate } from "react-router-dom";
import { IContext, ServerResponse } from "./Interfaces/commonInterfaces";
import Routes from "./Routes/Routes";
import { useEffect, useState, createContext } from "react";

export const Context = createContext<IContext>({
  socket: null,
  serverResponse: { methodName: "", body: {} },
  isConnected: false,
  setServerResponse: () => {},
});

function App() {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [serverResponse, setServerResponse] = useState<ServerResponse>(
    {} as ServerResponse
  );
  const [isConnected, setIsConnected] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const newSocket = new WebSocket("ws://localhost:5000");
    // const newSocket = new WebSocket("ws://10.21.9.24:5000");
    setSocket(newSocket);
    newSocket.onopen = () => {
      setIsConnected(true);
      console.log("WebSocket connected");
    };

    newSocket.onmessage = (event) => {
      setServerResponse(JSON.parse(event.data));
    };

    newSocket.onclose = () => {
      console.log("WebSocket connection closed");
      setIsConnected(false);
      // setTimeout(() => {
      //   setSocket(new WebSocket("ws://localhost:5000"));
      // }, 3000);
    };

    return () => {
      navigate("/");
      newSocket.close();
      setSocket(null);
    };
  }, []);

  return (
    <div className="Page">
      <Context.Provider
        value={{ socket, serverResponse, isConnected, setServerResponse }}
      >
        <Routes />
      </Context.Provider>
    </div>
  );
}

export default App;
