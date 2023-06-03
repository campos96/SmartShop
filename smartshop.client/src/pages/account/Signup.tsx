import { Navigate } from "react-router-dom";
import { PATHS } from "../../routes/paths";
import { authoridedUser } from "../../services/auth.service";


function Register() {
  if (authoridedUser()) {
    return <Navigate to={PATHS.ADMIN} />;
  }
  return (
      <div className="row justify-content-center">
        <div className="col-sm-8 col-md-7 col-lg-6 col-xl-5 col-xxl-4">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title text-center mb-4">Sign up</h4>
              <form>
                <div className="row">
                  <div className="col">
                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        id="name"
                        className="form-control"
                        placeholder="Name"
                      />
                      <label htmlFor="name" className="form-label">
                        Name
                      </label>
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        id="lastname"
                        className="form-control"
                        placeholder="Last name"
                      />
                      <label htmlFor="lastname" className="form-label">
                        Last name
                      </label>
                    </div>
                  </div>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="email"
                    id="email"
                    className="form-control"
                    placeholder="Email"
                  />
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    id="username"
                    className="form-control"
                    placeholder="Username"
                  />
                  <label htmlFor="username" className="form-label">
                    Username
                  </label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    id="Password"
                    className="form-control"
                    placeholder="Password:"
                  />
                  <label htmlFor="Password" className="form-label">
                    Password
                  </label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    id="PasswordConfirmation"
                    className="form-control"
                    placeholder="Password:"
                  />
                  <label htmlFor="PasswordConfirmation" className="form-label">
                    Password Confirmation
                  </label>
                </div>
                <a
                  href={PATHS.ACCOUNT_LOGIN}
                  className="text-secondary float-start mt-2"
                >
                  Already have an account?
                </a>
                <button type="submit" className="btn btn-primary float-end">
                  Log in
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
  );
}

export default Register;
