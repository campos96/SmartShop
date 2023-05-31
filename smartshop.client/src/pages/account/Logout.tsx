import { useEffect } from "react";
import { logout } from "../../services/auth.service";
import { PATHS } from "../../routes/paths";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";

function Logout() {
  useEffect(() => {
    logout();
  }, []);

  return (
    <>
      <div className="text-center">
        <FontAwesomeIcon
          icon={icon({ name: "circle-check", style: "regular" })}
          size="10x"
          className="my-3"
        />

        <h1>You have been logged out</h1>
        <h3>Thank you</h3>

        <a href={PATHS.ACCOUNT_LOGIN} className="btn btn-outline-primary mt-3">
          Log in
        </a>
      </div>
    </>
  );
}

export default Logout;
