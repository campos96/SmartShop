import { useState } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { Field, Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { login } from "../../services/auth.service";
import { PATHS } from "../../endpoints";

type Props = {};

function Login() {
  let navigate: NavigateFunction = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const initialValues: {
    username: string;
    password: string;
  } = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("This field is required!"),
    password: Yup.string().required("This field is required!"),
  });

  const handleLogin = (formValue: { username: string; password: string }) => {
    const { username, password } = formValue;

    setMessage("");
    setLoading(true);

    login(username, password).then(
      (response) => {
        console.log(response);
        navigate(PATHS.ROOT);
        window.location.reload();
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setLoading(false);
        setMessage(resMessage);
      }
    );
  };

  return (
    <div className="row justify-content-center">
      <div className="col-sm-8 col-md-7 col-lg-6 col-xl-5 col-xxl-4">
        <div className="card">
          <div className="card-body">
            <h4 className="card-title text-center mb-4">Log in</h4>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleLogin}
            >
              <Form>
                <div className="form-floating mb-3">
                  <Field
                    name="username"
                    type="text"
                    className="form-control"
                    placeholder="Username"
                  />
                  <label htmlFor="username" className="form-label">
                    Username
                  </label>
                  <ErrorMessage
                    name="username"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>
                <div className="form-floating mb-3">
                  <Field
                    name="password"
                    type="text"
                    className="form-control"
                    placeholder="Password:"
                  />
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>
                <div className="mb-3">
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      role="switch"
                      id="flexSwitchCheckChecked"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexSwitchCheckChecked"
                    >
                      Remember me
                    </label>
                  </div>
                </div>
                <a
                  href="/account/passwordrecovery"
                  className="text-secondary float-start mt-2"
                >
                  Forgot password?
                </a>

                <button type="submit" className="btn btn-primary float-end">
                  {loading && (
                    <span className="spinner-border spinner-border-sm"></span>
                  )}
                  <span>Log in</span>
                </button>

                {message && (
                  <div className="form-group">
                    <div className="alert alert-danger" role="alert">
                      {message}
                    </div>
                  </div>
                )}
              </Form>
            </Formik>
          </div>
        </div>
        <div className="row">
          <div className="col-12 text-center">
            <hr />
            <p>or</p>
            <a href="/account/signup" className="btn btn-outline-primary">
              Sign up
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
