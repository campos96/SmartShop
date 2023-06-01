import notFoundImage from "../assets/images/404-not-found.png";
import { PATHS } from "../routes/paths";

function NotFound() {
  return (
    <>
      <div className="row justify-content-center">
        <div className="col-md-6 text-center">
          <img src={notFoundImage} className="img-fluid" alt="Not found" />
          <a href={PATHS.ADMIN_HOME} className="btn btn-outline-dark">Go to Home</a>
        </div>
      </div>
    </>
  );
}

export default NotFound;
