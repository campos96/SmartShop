import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import { Container } from "react-bootstrap";

function LayoutAuth() {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <Container fluid="xxl" className="mt-5">
          <Outlet />
        </Container>
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default LayoutAuth;
