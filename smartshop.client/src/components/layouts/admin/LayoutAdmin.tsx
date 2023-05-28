import { ReactNode } from "react";
import { Outlet } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

import Navbar from "./Navbar";
import Footer from "./Footer";
import Sidebar from "./Sidebar";

function LayoutAdmin() {
  return (
    <>
      <Navbar />
      <div className="container-fluid mt-5">
        <div className="row">
          <div className="col-lg-3 col-xxl-2">
            <Sidebar />
          </div>
          <div className="col">
            <Outlet />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default LayoutAdmin;
