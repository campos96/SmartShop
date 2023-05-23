import { ReactNode } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

import Navbar from "../Navbar";
import Footer from "../Footer";

type layoutProps = { children?: ReactNode };

function LayoutAuth({ children }: layoutProps) {
  return (
    <>
      <Navbar />
      <div className="container-xxl mt-5">{children}</div>
      <Footer />
    </>
  );
}

export default LayoutAuth;
