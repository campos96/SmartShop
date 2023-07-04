import { Navigate, Outlet } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

import Navbar from "./Navbar";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import { authorizedUser } from "../../../services/auth.service";
import { PATHS } from "../../../routes/paths";

function LayoutAdminNoSidebar() {
  if (!authorizedUser()) {
    return <Navigate to={PATHS.ACCOUNT_LOGIN} />;
  }

  return (
    <>
      <Navbar />
      <div className="container-fluid mt-5">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default LayoutAdminNoSidebar;
