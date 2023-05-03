import { Routes as Switch, Route } from "react-router-dom";
import Login from "../Pages/Login";
import AfterAuthRoutes from "./AfterAuthRoutes";

const Routes = () => {
  return (
    <>
      <Switch>
        <Route element={<Login />} path="/" />
        <Route element={<AfterAuthRoutes />} path="*" />
      </Switch>
    </>
  );
};

export default Routes;
