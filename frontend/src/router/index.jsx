import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../views/Login";
import Register from "../views/Register";
import Dashboard from "../views/Dashboard";
import UpdateUser from "../views/UpdateUser";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/" />;
};

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/update/:id"
          element={
            <PrivateRoute>
              <UpdateUser />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
