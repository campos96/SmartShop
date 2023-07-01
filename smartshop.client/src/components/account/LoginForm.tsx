import { useState } from "react";
import { Button, Spinner, Form } from "react-bootstrap";
import * as formik from "formik";
import * as Yup from "yup";
import { login } from "../../services/auth.service";
import { PATHS } from "../../routes/paths";

import { ApiResponseError } from "../../types/ApiResponse";
import { Login } from "../../classes/Login";
import ValidationErrors from "../alerts/ValidationErrors";

function LoginForm({ onAuthSucceed = () => {} }) {
  const [loading, setLoading] = useState<boolean>(false);
  const [validationErrors, setValidationErrors] =
    useState<Array<ApiResponseError>>();

  const { Formik } = formik;

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("This field is required!"),
    password: Yup.string().required("This field is required!"),
  });

  const handleLogin = (formValues: {
    username: string;
    password: string;
    rememberMe: boolean;
  }) => {
    const { username, password } = formValues;
    setValidationErrors(undefined);
    setLoading(true);
    login(username, password)
      .then(
        (response) => {
          if (response.status === 200) {
            onAuthSucceed();
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
      validationSchema={validationSchema}
      onSubmit={handleLogin}
      initialValues={{ ...new Login() }}
    >
      {({ handleSubmit, handleChange, values, touched, errors }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <Form.Floating className="mb-3">
            <Form.Control
              type="text"
              name="username"
              placeholder="Username"
              value={values.username}
              onChange={handleChange}
              isInvalid={!!errors.username}
            />
            <Form.Label htmlFor="username">Username</Form.Label>
            <Form.Control.Feedback type="invalid">
              {values.username}
            </Form.Control.Feedback>
          </Form.Floating>
          <Form.Floating className="mb-3">
            <Form.Control
              type="password"
              name="password"
              placeholder="Password:"
              value={values.password}
              onChange={handleChange}
              isInvalid={!!errors.password}
            />
            <Form.Label htmlFor="password">Password</Form.Label>
            <Form.Control.Feedback type="invalid">
              {values.password}
            </Form.Control.Feedback>
          </Form.Floating>
          <Form.Group className="mb-3">
            <Form.Check type="checkbox" className="form-switch" id="rememberMe">
              <Form.Check.Input type="checkbox" role="checkbox" />
              <Form.Check.Label>Remember me</Form.Check.Label>
            </Form.Check>
          </Form.Group>

          {validationErrors && <ValidationErrors list={validationErrors} />}

          <Form.Group className="mb-3">
            <a
              href={PATHS.ACCOUNT_PASSWORD_RECOVERY}
              className="text-secondary float-start mt-2"
            >
              Forgot password?
            </a>
            <Button variant="primary" type="submit" className="float-end">
              {loading && <Spinner animation="border" size="sm"></Spinner>}
              <span>Log in</span>
            </Button>
          </Form.Group>
        </Form>
      )}
    </Formik>
  );
}
export default LoginForm;
