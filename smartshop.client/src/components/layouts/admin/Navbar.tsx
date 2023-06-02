import { PATHS } from "../../../routes/paths";
import { authUser } from "../../../services/auth.service";

function Navbar() {
  var user = authUser();

  return (
    <nav className="navbar navbar-expand-lg bg-white border-bottom shadow">
      <div className="container-fluid">
        <a className="navbar-brand" href={PATHS.ADMIN}>
          SmartShop Admin
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
                href={PATHS.ADMIN_HOME}
              >
                Home
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link active"
                aria-current="page"
                href={PATHS.ADMIN_STOCK}
              >
                Stock
              </a>
            </li>
          </ul>
          <div className="d-flex">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a
                  className="nav-link active"
                  aria-current="page"
                  href={PATHS.ADMIN_PROFILE}
                >
                  {user?.identity.name}
                </a>
              </li>
            </ul>
            <a href={PATHS.ACCOUNT_LOGOUT} className="btn btn-outline-danger">
              Log out
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
