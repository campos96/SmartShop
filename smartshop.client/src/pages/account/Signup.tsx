import { useState } from "react";
import { Navigate } from "react-router-dom";
import { PATHS } from "../../routes/paths";
import { Card, Col, Row } from "react-bootstrap";

import { authoridedUser } from "../../services/auth.service";
import SignupForm from "../../components/account/SignupForm";

function Register() {
  const [signupSucceed, setSignupSucceed] = useState<boolean>(false);

  if (authoridedUser() || signupSucceed) {
    return <Navigate to={PATHS.ADMIN} />;
  }

  const onSignupSucceed = () => {
    setSignupSucceed(true);
  };
  
  return (
    <Row className="justify-content-center">
      <Col sm={8} md={7} lg={6} xl={5} xxl={4}>
        <Card>
          <Card.Body>
            <Card.Title title="h1" className="text-center mt-4 mb-5">
              Sign up
            </Card.Title>

            <SignupForm onSignupSucceed={onSignupSucceed} />
          </Card.Body>
        </Card>
        <Row className="text-center mt-3">
          <Col>
            <hr />
            <p>or</p>
            <a href={PATHS.ACCOUNT_LOGIN} className="btn btn-outline-primary">
              Log in
            </a>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

export default Register;
