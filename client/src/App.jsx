import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminDashBoard from "./pages/Admin/AdminDashboard.jsx";
import AdminSignup from "./pages/Admin/AdminSignup.jsx";
import AdminLogin from "./pages/Admin/AdminLogin.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import useGetAllProject from "./hooks/useGetAllProject.jsx";

export default function App() {
  useGetAllProject()
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<ProtectedRoute element={<AdminDashBoard/>} />} />
        <Route path="/login" element={<AdminLogin />} />
        <Route path="/register" element={<AdminSignup />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
