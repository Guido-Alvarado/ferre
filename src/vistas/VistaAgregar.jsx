import React, { useState } from "react";
import FormularioProducto from "../components/FormularioProducto";
import { useNavigate } from "react-router-dom";

export default function VistaAgregar({ setProductos }) {
  const [nuevo, setNuevo] = useState({
    codigo: "",
    descripcion: "",
    precio1: "",
    precio2: "",
    info: "",
    ubicacion: "",
    stock: "",
  });
  const navigate = useNavigate();

  const agregarProducto = (e) => {
    e.preventDefault();
    if (!nuevo.codigo || !nuevo.descripcion || !nuevo.precio1) return;

    setProductos((prev) => {
      const actualizado = [
        ...prev,
        {
          ...nuevo,
          precio1: +nuevo.precio1,
          precio2: +nuevo.precio2,
          stock: +nuevo.stock,
        },
      ];
      localStorage.setItem("listaLocal", JSON.stringify(actualizado)); // 🔑 guardamos
      return actualizado;
    });

    navigate("/inicio");
  };

  return (
    <div className="flex flex-col items-center p-4">
      <h2 className="text-2xl font-bold mb-4">Agregar Producto</h2>

      <FormularioProducto
        nuevo={nuevo}
        setNuevo={setNuevo}
        onSubmit={agregarProducto}
      />

      <button
        onClick={() => navigate("/inicio")}
        className="mt-4 bg-gray-500 text-white rounded-xl py-2 px-6"
      >
        Volver
      </button>
    </div>
  );
}
