import { useEffect } from "react";
import { logout } from "../../services/auth.service";
import { PATHS } from "../../routes/paths";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { Button, Col, Row } from "react-bootstrap";

function Logout() {
  useEffect(() => {
    logout();
  }, []);

  return (
    <Row className="text-center">
      <Col sm={12} className="mt-3">
        <FontAwesomeIcon
          icon={icon({ name: "circle-check", style: "regular" })}
          size="10x"
          className="my-3"
        />
      </Col>
      <Col sm={12} className="mt-3">
        <h1>You have been logged out</h1>
        <h3>Thank you</h3>
      </Col>
      <Col sm={12} className="mt-3">
        <Button variant="outline-primary" href={PATHS.ACCOUNT_LOGIN}>
          Log in
        </Button>
      </Col>
    </Row>
  );
}

export default Logout;
