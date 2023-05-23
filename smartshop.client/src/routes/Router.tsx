import { Routes, Route } from "react-router-dom";

import Login from "../pages/account/Login";
import Signup from "../pages/account/Signup";

function Router() {
  return (
    <Routes>
      <Route path="/" element={ <Login /> } />
      <Route path="/account/login" element={ <Login /> } />
      <Route path="/account/signup" element={ <Signup /> } />
    </Routes>
  );
}

export default Router;
