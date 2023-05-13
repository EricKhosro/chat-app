import { Routes as Swiich, Route } from "react-router-dom";
import Messenger from "../Pages/Messenger/Messenger";
import RegisterUser from "../Pages/RegisterUser";

const AfterAuthRoutes = () => {
  return (
    <Swiich>
      <Route element={<Messenger />} path="/Messenger" />
      <Route element={<RegisterUser />} path="/RegisterUser" />
    </Swiich>
  );
};

export default AfterAuthRoutes;
