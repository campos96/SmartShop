import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import * as formik from "formik";
import * as yup from "yup";
import { Signup } from "../../types/Signup";
import { signup } from "../../services/auth.service";
import { useState } from "react";
import { ApiResponseError } from "../../types/ApiResponse";
import ValidationErrors from "../alerts/ValidationErrors";
import { Spinner } from "react-bootstrap";

function SignupForm({ onSignupSucceed = () => {} }) {
  const [loading, setLoading] = useState<boolean>(false);
  const [validationErrors, setValidationErrors] =
    useState<Array<ApiResponseError>>();
  const { Formik } = formik;

  const schema = yup.object().shape({
    firstName: yup.string().required("First name is required."),
    lastName: yup.string().required("Last name is required."),
    username: yup.string().required("Username is required."),
    email: yup
      .string()
      .required("Email is required.")
      .email("Email must be a valid email"),
    password: yup.string().required("Password is required."),
    passwordConfirmation: yup
      .string()
      .required("Password confirmation is required."),
  });

  const handleSignup = (signupValues: Signup) => {
    setLoading(true);
    signup(signupValues)
      .then(
        (response) => {
          if (response.status === 200) {
            onSignupSucceed();
          } else {
            setValidationErrors(response.errors);
          }
        },
        (error) => {
          setValidationErrors([{ key: "", value: "An error has ocurred." }]);
        }
      )
      .then(() => {
        setLoading(false);
      });
  };

  return (
    <Formik
      validationSchema={schema}
      onSubmit={handleSignup}
      initialValues={{ ...new Signup() }}
    >
      {({ handleSubmit, handleChange, values, touched, errors }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <Row>
            <Form.Group
              as={Col}
              md={6}
              className="mb-3"
              controlId="validationFormik01"
            >
              <Form.Floating>
                <Form.Control
                  type="text"
                  placeholder="First name"
                  name="firstName"
                  value={values.firstName}
                  onChange={handleChange}
                  isInvalid={!!errors.firstName}
                />
                <Form.Label>First name</Form.Label>
                <Form.Control.Feedback type="invalid">
                  {errors.firstName}
                </Form.Control.Feedback>
              </Form.Floating>
            </Form.Group>
            <Form.Group
              as={Col}
              md={6}
              className="mb-3"
              controlId="validationFormik02"
            >
              <Form.Floating>
                <Form.Control
                  type="text"
                  placeholder="Last name"
                  name="lastName"
                  value={values.lastName}
                  onChange={handleChange}
                  isInvalid={!!errors.lastName}
                />
                <Form.Label>Last name</Form.Label>
                <Form.Control.Feedback type="invalid">
                  {errors.lastName}
                </Form.Control.Feedback>
              </Form.Floating>
            </Form.Group>
          </Row>
          <Row>
            <Form.Group
              as={Col}
              className="mb-3"
              controlId="validationFormikUsername"
            >
              <Form.Floating>
                <Form.Control
                  type="text"
                  placeholder="Username"
                  aria-describedby="inputGroupPrepend"
                  name="username"
                  value={values.username}
                  onChange={handleChange}
                  isInvalid={!!errors.username}
                />
                <Form.Label>Username</Form.Label>
                <Form.Control.Feedback type="invalid">
                  {errors.username}
                </Form.Control.Feedback>
              </Form.Floating>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group
              as={Col}
              md={12}
              className="mb-3"
              controlId="validationFormik03"
            >
              <Form.Floating>
                <Form.Control
                  type="text"
                  placeholder="Email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  isInvalid={!!errors.email}
                />
                <Form.Label>Email</Form.Label>
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </Form.Floating>
            </Form.Group>
            <Form.Group
              as={Col}
              md={12}
              className="mb-3"
              controlId="validationFormik04"
            >
              <Form.Floating>
                <Form.Control
                  type="text"
                  placeholder="Password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  isInvalid={!!errors.password}
                />
                <Form.Label>Password</Form.Label>
                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
              </Form.Floating>
            </Form.Group>
            <Form.Group
              as={Col}
              md={12}
              className="mb-3"
              controlId="validationFormik05"
            >
              <Form.Floating>
                <Form.Control
                  type="text"
                  placeholder="Password Confirmation"
                  name="passwordConfirmation"
                  value={values.passwordConfirmation}
                  onChange={handleChange}
                  isInvalid={!!errors.passwordConfirmation}
                />
                <Form.Label>Password Confirmation</Form.Label>
                <Form.Control.Feedback type="invalid">
                  {errors.passwordConfirmation}
                </Form.Control.Feedback>
              </Form.Floating>
            </Form.Group>
          </Row>

          {validationErrors && <ValidationErrors list={validationErrors} />}

          <Row>
            <Col>
              <Button type="submit" className="float-end">
                {loading && <Spinner animation="border" size="sm"></Spinner>}
                <span>Sign up</span>
              </Button>
            </Col>
          </Row>
        </Form>
      )}
    </Formik>
  );
}

export default SignupForm;
