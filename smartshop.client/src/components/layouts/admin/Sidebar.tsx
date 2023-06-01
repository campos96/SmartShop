import SidebarMenu from "./SidebarMenu";

function Sidebar() {
  return (
    <div className="card sidebar">
      <div className="card-body">
        <h4 className="card-title">Menu</h4>
        <SidebarMenu />
      </div>
    </div>
  );
}

export default Sidebar;
