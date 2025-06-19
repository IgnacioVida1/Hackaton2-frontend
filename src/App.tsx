import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
import PaginaPrincipal from "./pages/PaginaPrincipal";
import SelectorMes from "./components/SelectorMes";
import { TokenProvider } from "./context/TokenContext";
import Navbar from "./components/NavBar";

function App() {
  return (
    <TokenProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Acceso libre, sin token */}
          <Route path="/selector-mes" element={<SelectorMes />} />
          <Route path="/expenses-summary/:year/:month" element={<PaginaPrincipal />} />
        </Routes>
      </Router>
    </TokenProvider>
  );
}

export default App;
