import { ErrorMessage, Field, Formik, Form } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { login } from "../../services/auth.service";
import { PATHS } from "../../routes/paths";
import {
  Button,
  FormCheck,
  FormGroup,
  FormLabel,
  Spinner,
} from "react-bootstrap";

import ValidationErrors from "../alerts/ValidationErrors";
import { ApiResponseError } from "../../types/ApiResponse";

function LoginForm({ onAuthSucceed = () => {} }) {
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<Array<ApiResponseError>>();

  const initialValues: {
    username: string;
    password: string;
    rememberMe: boolean;
  } = {
    username: "",
    password: "",
    rememberMe: false,
  };

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
    setErrors(undefined);
    setLoading(true);
    login(username, password)
      .then(
        (response) => {
          if (response.status === 200) {
            onAuthSucceed();
          } else {
            setErrors(response.errors);
          }
        },
        (error) => {
          setErrors([{ key: "", value: "An error has ocurred." }]);
        }
      )
      .then(() => {
        setLoading(false);
      });
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleLogin}
    >
      <Form>
        <FormGroup className="form-floating mb-3">
          <Field
            name="username"
            type="text"
            className="form-control"
            placeholder="Username"
          />
          <FormLabel htmlFor="username">Username</FormLabel>
          <ErrorMessage
            name="username"
            component="span"
            className="text-danger"
          />
        </FormGroup>
        <FormGroup className="form-floating mb-3">
          <Field
            name="password"
            type="password"
            className="form-control"
            placeholder="Password:"
          />
          <FormLabel htmlFor="password">Password</FormLabel>
          <ErrorMessage
            name="password"
            component="span"
            className="text-danger"
          />
        </FormGroup>
        <FormGroup className="mb-3">
          <FormCheck className="form-check form-switch">
            <Field
              name="rememberMe"
              className="form-check-input"
              type="checkbox"
              role="switch"
            />
            <FormCheck.Label htmlFor="rememberMe">Remember me</FormCheck.Label>
          </FormCheck>
        </FormGroup>

        {errors && <ValidationErrors list={errors} />}

        <FormGroup className="mb-3">
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
        </FormGroup>
      </Form>
    </Formik>
  );
}
export default LoginForm;
