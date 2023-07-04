import { useState } from "react";
import { Navigate } from "react-router-dom";
import { Card, Col, Row } from "react-bootstrap";

import { PATHS } from "../../routes/paths";
import { authorizedUser } from "../../services/auth.service";
import LoginForm from "../../components/account/LoginForm";

function Login() {
  const [authSucceed, setAuthSucceed] = useState<boolean>(false);

  if (authorizedUser() || authSucceed) {
    return <Navigate to={PATHS.ADMIN} />;
  }

  const onAuthSucceed = () => {
    setAuthSucceed(true);
  };

  return (
    <Row className="justify-content-center">
      <Col sm={8} md={7} lg={6} xl={5} xxl={4}>
        <Card>
          <Card.Body>
            <Card.Title className="text-center mt-4 mb-5">Log in</Card.Title>
            <LoginForm onAuthSucceed={onAuthSucceed} />
          </Card.Body>
        </Card>
        <Row className="text-center mt-3">
          <Col>
            <hr />
            <p>or</p>
            <a href={PATHS.ACCOUNT_SIGNUP} className="btn btn-outline-primary">
              Sign up
            </a>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

export default Login;
