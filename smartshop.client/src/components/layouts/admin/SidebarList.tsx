function SidebarList() {
  return (
    <div className="list-group list-group-flush">
      <a href="/admin/home" className="list-group-item list-group-item-action">
        Home
      </a>
      <a href="/admin/stock" className="list-group-item list-group-item-action">
        Stock
      </a>
      <a href="/admin/products" className="list-group-item list-group-item-action">
        Products
      </a>
      <a href="/" className="list-group-item list-group-item-action">
        A fourth link item
      </a>
      <a href="/" className="list-group-item list-group-item-action disabled">
        A disabled link item
      </a>
    </div>
  );
}

export default SidebarList;
