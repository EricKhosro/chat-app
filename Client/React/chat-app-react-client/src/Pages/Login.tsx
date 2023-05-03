import { useState, useContext } from "react";
import { LoginFormValues } from "../Interfaces/loginInterfaces";
import TextInput from "../Components/TextInput";
import Button from "../Components/Button";
import { Context } from "../App";

const Login = () => {
  const [values, setValues] = useState<LoginFormValues>({} as LoginFormValues);

  const { socket } = useContext(Context);

  const changeHandler = (name: string, value: any) => {
    setValues({ ...values, [name]: value });
  };

  const clickHandler = () => {
    console.log(socket);
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
        name="username"
        onChange={changeHandler}
        value={values.username}
      />
      <TextInput
        name="password"
        onChange={changeHandler}
        value={values.password}
      />
      <Button text="Login" onClick={clickHandler} />
    </div>
  );
};

export default Login;
