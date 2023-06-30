import { Button, ButtonGroup, Container, Nav, Navbar } from "react-bootstrap";
import { PATHS } from "../../../routes/paths";

function AppNavbar() {
  return (
    <Navbar expand="lg">
      <Container fluid>
        <Navbar.Brand href={PATHS.ROOT}>SmartShop</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarSupportedContent" />
        <Navbar.Collapse className="mt-1" id="navbarSupportedContent">
          <Nav className="me-auto mb-2 mb-lg-0">
            <Nav.Link href={PATHS.ROOT}>Home</Nav.Link>
            <Nav.Link href={PATHS.ADMIN}>Admin</Nav.Link>
          </Nav>
          <div className="d-flex">
            <ButtonGroup className="gap-1">
              <Button href={PATHS.ACCOUNT_LOGIN} variant="primary">
                Log in
              </Button>
              <Button href={PATHS.ACCOUNT_SIGNUP} variant="outline-primary">
                Sign up
              </Button>
            </ButtonGroup>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;
