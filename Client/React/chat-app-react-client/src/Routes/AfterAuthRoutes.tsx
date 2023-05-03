import { Routes as Swiich, Route } from "react-router-dom";
import Messenger from "../Pages/Messenger";

const AfterAuthRoutes = () => {
  return (
    <Swiich>
      <Route Component={Messenger} path="/Messenger" />
    </Swiich>
  );
};

export default AfterAuthRoutes;
