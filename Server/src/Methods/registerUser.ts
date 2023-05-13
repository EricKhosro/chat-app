import { IMethodClass } from "../interfaces/interfaces";
import {
  RegisterInput,
  RegisterResponse,
} from "../interfaces/registerUserInterface";
import { globalUserManager } from "./login.js";

export class RegisterUser
  implements IMethodClass<RegisterInput, RegisterResponse>
{
  public handle = (data: RegisterInput, guid: string | null) => {
    try {
      globalUserManager.addUser({
        username: data.username,
        password: data.password,
        id: null,
      });
    } catch (error) {
      if (error instanceof Error)
        return {
          methodName: "registerUser",
          body: {
            data: false,
            msg: error.message,
          },
        };
    }

    return {
      methodName: "registerUser",
      body: {
        data: true,
        msg: "new User created successfully",
      },
    };
  };
}
