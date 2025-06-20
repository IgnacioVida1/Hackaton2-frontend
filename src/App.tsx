import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
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
          {/* Redirección raíz al login */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* Páginas públicas */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/selector-mes" element={<SelectorMes />} />

          {/* Página principal del resumen de gastos */}
          <Route path="/expenses-summary/:year/:month" element={<PaginaPrincipal />} />
        </Routes>
      </Router>
    </TokenProvider>
  );
}

export default App;
