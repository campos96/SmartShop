import { PATHS } from "../../../routes/paths";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <a className="navbar-brand" href={PATHS.ROOT}>
          SmartShop
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse mt-1"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a
                className="nav-link active"
                aria-current="page"
                href={PATHS.ROOT}
              >
                Home
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link active"
                aria-current="page"
                href={PATHS.ADMIN}
              >
                Admin
              </a>
            </li>
          </ul>
          <div className="d-flex">
            <a href={PATHS.ACCOUNT_LOGIN} className="btn btn-primary me-3">
              Log in
            </a>
            <a href={PATHS.ACCOUNT_SIGNUP} className="btn btn-outline-primary">
              Sign up
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
