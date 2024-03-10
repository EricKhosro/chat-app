import { useNavigate } from "react-router-dom";
import Routes from "./Routes/Routes";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  setIsConnected,
  setServerResponse,
  setSocket,
} from "./Slices/connectionSlice";

function App() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    const newSocket = new WebSocket("ws://10.81.9.10:5000");
    dispatch(setSocket(newSocket));
    newSocket.onopen = () => {
      dispatch(setIsConnected(true));
      console.log("WebSocket connected");
    };

    newSocket.onmessage = (event) => {
      dispatch(setServerResponse(JSON.parse(event.data)));
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
      <Routes />
    </div>
  );
}

export default App;
