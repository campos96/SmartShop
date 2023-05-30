import { Routes, Route, Navigate } from "react-router-dom";

import LayoutAuth from "../components/layouts/auth/LayoutAuth";
import LayoutAdmin from "../components/layouts/admin/LayoutAdmin";

import Login from "../pages/account/Login";
import Signup from "../pages/account/Signup";

import AdminHomeIndex from "../pages/Admin/Home/Index";

import AdminStockIndex from "../pages/Admin/Stock/Index";
import AdminProductIndex from "../pages/Admin/Products/Index";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/account" />} />
      <Route path="/account" element={<LayoutAuth />}>
        <Route path="" element={<Navigate to="login" />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
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
      </Route>
    </Routes>
  );
}

export default AppRouter;