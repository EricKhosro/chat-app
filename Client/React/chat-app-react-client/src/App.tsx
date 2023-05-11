import "./App.css";
import { IContext, ServerResponse } from "./Interfaces/commonDTOs";
import Routes from "./Routes/Routes";
import { useEffect, useState, createContext } from "react";

export const Context = createContext<IContext>({
  socket: null,
  serverResponse: { methodName: "", body: {} },
});

function App() {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [serverResponse, setServerResponse] = useState<ServerResponse>(
    {} as ServerResponse
  );

  useEffect(() => {
    const newSocket = new WebSocket("ws://localhost:5000");
    setSocket(newSocket);
    newSocket.onopen = () => {
      console.log("WebSocket connected");
    };

    newSocket.onmessage = (event) => {
      setServerResponse(JSON.parse(event.data));
    };

    newSocket.onclose = () => {
      console.log("WebSocket connection closed");
      setTimeout(() => {
        setSocket(new WebSocket("ws://localhost:5000"));
      }, 3000);
    };

    return () => {
      newSocket.close();
      setSocket(null);
    };
  }, []);

  return (
    <div className="page">
      <Context.Provider value={{ socket, serverResponse }}>
        <Routes />
      </Context.Provider>
    </div>
  );
}

export default App;
