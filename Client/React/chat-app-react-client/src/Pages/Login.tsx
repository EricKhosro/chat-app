import { useState, useContext, useEffect } from "react";
import { LoginFormValues } from "../Interfaces/loginInterfaces";
import TextInput from "../Components/TextInput";
import Button from "../Components/Button";
import { Context } from "../App";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [values, setValues] = useState<LoginFormValues>({} as LoginFormValues);

  const { socket, serverResponse } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    if (!serverResponse || serverResponse.methodName !== "login") return;

    if (!serverResponse.body.data) toast.error(serverResponse.body.msg);
    if (serverResponse.body.data) navigate("/Messenger");
  }, [serverResponse]);

  const changeHandler = (name: string, value: any) => {
    setValues({ ...values, [name]: value });
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
    <div className="flex flex-col justify-start items-center gap-3">
      <TextInput
        type="text"
        name="username"
        onChange={changeHandler}
        value={values.username}
      />
      <TextInput
        type="password"
        name="password"
        onChange={changeHandler}
        value={values.password}
      />
      <Button text="Login" onClick={clickHandler} />
    </div>
  );
};

export default Login;
