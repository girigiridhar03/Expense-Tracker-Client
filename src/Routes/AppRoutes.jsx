import Auth from "@/pages/auth/Auth";
import Dashboard from "@/pages/Dashboard/Dashboard";
import Mainlayout from "@/pages/Main/Mainlayout";
import { authCheck } from "@/store/auth/auth.service";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { ProtectedRoute, PublicRoute } from "./RouteGuards";

const AppRoutes = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authCheck());
  }, [dispatch]);

  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route path="/register" element={<Auth />} />
        <Route path="/login" element={<Auth />} />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route element={<Mainlayout />}>
          <Route path="/" element={<Dashboard />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
