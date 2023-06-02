import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PATHS } from "../../../routes/paths";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";

function SidebarMenu() {
  return (
    <div className="list-group">
      <a
        href={PATHS.ADMIN_HOME}
        className="list-group-item list-group-item-action"
      >
        Home
        <FontAwesomeIcon icon={icon({ name: "house" })} className="float-end" />
      </a>
      <a
        href={PATHS.ADMIN_STOCK}
        className="list-group-item list-group-item-action"
      >
        Stock
        <FontAwesomeIcon
          icon={icon({ name: "boxes-stacked" })}
          className="float-end"
        />
      </a>
      <a
        href={PATHS.ADMIN_PRODUCTS}
        className="list-group-item list-group-item-action"
      >
        Products
        <FontAwesomeIcon icon={icon({ name: "box" })} className="float-end" />
      </a>
      <a
        href={PATHS.ADMIN_PRODUCT_CATEGORIES}
        className="list-group-item list-group-item-action"
      >
        Categories
        <FontAwesomeIcon
          icon={icon({ name: "layer-group" })}
          className="float-end"
        />
      </a>
      <a
        href={PATHS.ADMIN_PRODUCT_CONDITIONS}
        className="list-group-item list-group-item-action"
      >
        Conditions
        <FontAwesomeIcon
          icon={icon({ name: "layer-group" })}
          className="float-end"
        />
      </a>
    </div>
  );
}

export default SidebarMenu;
