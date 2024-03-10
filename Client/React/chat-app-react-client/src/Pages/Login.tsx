import { useState, useEffect } from "react";
import { LoginFormValues } from "../Interfaces/loginInterfaces";
import TextInput from "../Components/TextInput";
import Button from "../Components/Button";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../Store/store";
import { useAppSelector } from "../Store/hooks";

const Login = () => {
  const [values, setValues] = useState<LoginFormValues>({} as LoginFormValues);

  const { serverResponse, isConnected } = useAppSelector(
    (store) => store.connection
  );
  const navigate = useNavigate();

  const { socket } = useSelector((state: RootState) => state.connection);

  useEffect(() => {
    if (!serverResponse || serverResponse.methodName !== "login") return;

    if (!serverResponse.body.data) toast.error(serverResponse.body.msg);
    if (serverResponse.body.data) {
      navigate("/Messenger", { state: { username: values.username } });
    }
  }, [serverResponse]);

  const changeHandler = (name: string, value: any) => {
    setValues({ ...values, [name]: value });
  };

  const keydownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") clickHandler();
  };

  const clickHandler = () => {
    if (socket && socket.readyState === WebSocket.OPEN)
      socket?.send(
        JSON.stringify({
          methodName: "login",
          body: {
            username: values.username,
            password: values.password,
          },
        })
      );
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div className="w-56 h-min flex flex-col justify-start items-center gap-3 border-purple-600 border-2 rounded p-5">
        <TextInput
          placeholder="username"
          type="text"
          name="username"
          onChange={changeHandler}
          value={values.username}
        />
        <TextInput
          placeholder="password"
          type="password"
          name="password"
          onChange={changeHandler}
          value={values.password}
          onKeyDown={keydownHandler}
        />
        <Button text="Login" onClick={clickHandler} disabled={!isConnected} />
        <div
          className="text-sm cursor-pointer"
          onClick={() => navigate("/RegisterUser")}
        >
          Don't have an account? Register here
        </div>
      </div>
    </div>
  );
};

export default Login;
