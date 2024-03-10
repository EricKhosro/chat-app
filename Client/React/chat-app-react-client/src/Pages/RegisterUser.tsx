import { useState, useContext, useEffect } from "react";
import TextInput from "../Components/TextInput";
import Button from "../Components/Button";
import { RegisterFormValues } from "../Interfaces/registerInterface";
import { Context } from "../App";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ServerResponse } from "../Interfaces/commonInterfaces";

const RegisterUser = () => {
  const [values, setValues] = useState<RegisterFormValues>(
    {} as RegisterFormValues
  );

  const { socket, serverResponse, isConnected, setServerResponse } =
    useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    if (!serverResponse || serverResponse.methodName !== "registerUser") return;

    if (!serverResponse.body.data) toast.error(serverResponse.body.msg);
    if (serverResponse.body.data) {
      toast.success(serverResponse.body.msg);
      navigate("/chat-app/");
      if (setServerResponse) setServerResponse({} as ServerResponse);
    }
  }, [serverResponse]);

  const changeHandler = (name: string, value: any) => {
    setValues({ ...values, [name]: value });
  };

  const clickHandler = () => {
    if (socket && socket.readyState === WebSocket.OPEN)
      socket?.send(
        JSON.stringify({
          methodName: "registerUser",
          body: {
            username: values.username,
            password: values.password,
            name: values.name,
          },
        })
      );
  };

  const checkDisabled = () => {
    if (!isConnected) return true;
    if (!values) return true;
    if (!values.name || !values.username || !values.password) return true;
    return false;
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div className="w-56 h-min flex flex-col justify-start items-center gap-3 border-purple-600 border-2 rounded p-5">
        <TextInput
          placeholder="name"
          type="text"
          name="name"
          onChange={changeHandler}
          value={values.name}
        />
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
        />

        <Button
          text="Register"
          onClick={clickHandler}
          disabled={checkDisabled()}
        />
      </div>
    </div>
  );
};

export default RegisterUser;
