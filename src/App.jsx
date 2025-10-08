import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import VistaInicio from "./vistas/VistaInicio";
import VistaAgregar from "./vistas/VistaAgregar";

export default function App() {
  const [productos, setProductos] = useState([]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/inicio" replace />} />
        <Route
          path="/inicio"
          element={<VistaInicio productos={productos} setProductos={setProductos} />}
        />
        <Route
          path="/agregar"
          element={<VistaAgregar setProductos={setProductos} />}
        />
      </Routes>
    </Router>
  );
}
