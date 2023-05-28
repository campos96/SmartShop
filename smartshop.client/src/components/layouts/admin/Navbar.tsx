function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-white border-bottom shadow">
      <div className="container-fluid">
        <a className="navbar-brand" href="/admin">
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
              <a className="nav-link active" aria-current="page" href="/admin/home">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/admin/stock">
                Stock
              </a>
            </li>
          </ul>
          <div className="d-flex">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/admin">
                <strong>Cesar Campos</strong>
              </a>
            </li>
          </ul>
            <a href="/account/logout" className="btn btn-outline-danger">
              Log out
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
