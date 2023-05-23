function Login() {
  return (
    <div className="row justify-content-center">
      <div className="col-sm-8 col-md-7 col-lg-6 col-xl-5 col-xxl-4">
        <div className="card">
          <div className="card-body">
            <h4 className="card-title text-center mb-4">Log in</h4>
            <form>
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
              <a href="/account/passwordrecovery" className="text-secondary float-start mt-2">
                Forgot password?
              </a>
              <button type="submit" className="btn btn-primary float-end">
                Log in
              </button>
            </form>
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
