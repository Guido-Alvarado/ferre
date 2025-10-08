import React, { useState } from "react";

export default function ItemVista({ item, onAgregar, onEditar, onEliminar }) {
  const [editando, setEditando] = useState(false);
  const [data, setData] = useState(item);

  const handleChange = (campo, valor) => setData({ ...data, [campo]: valor });

  const guardarCambios = () => {
    onEditar(data); // Enviar todo el objeto actualizado a VistaInicio
    setEditando(false);
  };

  return (
    <div className="bg-white shadow-md rounded-2xl p-4 mb-4 text-center text-lg">
      <div className="font-bold text-xl mb-2">{data.descripcion}</div>
      <div>Código: {data.codigo}</div>
      <div>Precio 1: ${data.precio1}</div>
      <div>Precio 2: ${data.precio2}</div>

      {editando ? (
        <>
          <input
            type="text"
            placeholder="Descripción"
            value={data.descripcion}
            onChange={(e) => handleChange("descripcion", e.target.value)}
            className="border p-2 rounded w-full my-1"
          />
          <input
            type="text"
            placeholder="Ubicación"
            value={data.ubicacion || ""}
            onChange={(e) => handleChange("ubicacion", e.target.value)}
            className="border p-2 rounded w-full my-1"
          />
          <input
            type="number"
            placeholder="Stock"
            value={data.stock || 0}
            onChange={(e) => handleChange("stock", e.target.value)}
            className="border p-2 rounded w-full my-1"
          />
          <textarea
            placeholder="Info adicional"
            value={data.info || ""}
            onChange={(e) => handleChange("info", e.target.value)}
            className="border p-2 rounded w-full my-1"
          />
          <button
            onClick={guardarCambios}
            className="bg-green-500 text-white px-3 py-1 rounded mt-2"
          >
            Guardar
          </button>
        </>
      ) : (
        <>
          <div>Ubicación: {data.ubicacion || "—"}</div>
          <div>Stock: {data.stock || 0}</div>
          <div className="italic text-gray-600 mt-1">{data.info || "Sin información adicional"}</div>
          <div className="flex justify-around mt-3">
            <button
              onClick={() => onAgregar(data)}
              className="bg-blue-500 text-white px-3 py-1 rounded"
            >
              Agregar
            </button>
            <button
              onClick={() => setEditando(true)}
              className="bg-yellow-500 text-white px-3 py-1 rounded"
            >
              Editar
            </button>
            {onEliminar && (
              <button
                onClick={onEliminar}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Eliminar
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}
