import { PATHS } from "../../../routes/paths";

function SidebarList() {
  return (
    <div className="list-group list-group-flush">
      <a
        href={PATHS.ADMIN_HOME}
        className="list-group-item list-group-item-action"
      >
        Home
      </a>
      <a
        href={PATHS.ADMIN_STOCK}
        className="list-group-item list-group-item-action"
      >
        Stock
      </a>
      <a
        href={PATHS.ADMIN_PRODUCTS}
        className="list-group-item list-group-item-action"
      >
        Products
      </a>
      <a
        href={PATHS.ADMIN_PRODUCT_CATEGORIES}
        className="list-group-item list-group-item-action"
      >
        Categories
      </a>
    </div>
  );
}

export default SidebarList;
