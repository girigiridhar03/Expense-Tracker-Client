import Auth from "@/pages/auth/Auth";
import Dashboard from "@/pages/Dashboard/Dashboard";
import Mainlayout from "@/pages/Main/Mainlayout";
import { Route, Routes } from "react-router-dom";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/register" element={<Auth />} />
      <Route path="/login" element={<Auth />} />
      <Route element={<Mainlayout />}>
        <Route path="/" element={<Dashboard />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
