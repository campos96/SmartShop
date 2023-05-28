import { ReactNode } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

function LayoutAuth() {
  return (
    <>
      <Navbar />
      <div className="container-xxl mt-5">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default LayoutAuth;
