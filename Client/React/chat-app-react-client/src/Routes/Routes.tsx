import { Routes as Switch, Route } from "react-router-dom";
import Login from "../Pages/Login";
import AfterAuthRoutes from "./AfterAuthRoutes";

const Routes = () => {
  return (
    <Switch>
      <Route path="/chat-app/" element={<Login />} />
      <Route path="*" element={<AfterAuthRoutes />} />
    </Switch>
  );
};

export default Routes;
