import { Routes, Route, Navigate } from "react-router-dom";

import LayoutAuth from "../components/layouts/auth/LayoutAuth";
import LayoutAdmin from "../components/layouts/admin/LayoutAdmin";
import LayoutAdminNoSidebar from "../components/layouts/admin/LayoutAdminNoSidebar";

import Login from "../pages/account/Login";
import Signup from "../pages/account/Signup";
import Logout from "../pages/account/Logout";

import AdminHomeIndex from "../pages/Admin/Home/Index";

import AdminStockIndex from "../pages/Admin/Stock/Index";
import AdminProductIndex from "../pages/Admin/Products/Index";

import AdminCategoryIndex from "../pages/Admin/ProductCategories/Index";

import AdminConditionIndex from "../pages/Admin/ProductConditions/Index";

import NotFound from "../pages/NotFound";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/account" />} />
      <Route path="/account" element={<LayoutAuth />}>
        <Route path="" element={<Navigate to="login" />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="logout" element={<Logout />} />
      </Route>
      <Route path="/admin" element={<LayoutAdmin />}>
        <Route path="" element={<Navigate to="home" />} />
        <Route path="home" element={<AdminHomeIndex />} />
        <Route path="stock">
          <Route path="" element={<Navigate to="index" />} />
          <Route path="index" element={<AdminStockIndex />} />
        </Route>
        <Route path="products">
          <Route path="" element={<Navigate to="index" />} />
          <Route path="index" element={<AdminProductIndex />} />
        </Route>
        <Route path="product-categories">
          <Route path="" element={<Navigate to="index" />} />
          <Route path="index" element={<AdminCategoryIndex />} />
        </Route>
        <Route path="product-conditions">
          <Route path="" element={<Navigate to="index" />} />
          <Route path="index" element={<AdminConditionIndex />} />
        </Route>
      </Route>
      <Route path="*" element={<LayoutAdminNoSidebar />}>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default AppRouter;
