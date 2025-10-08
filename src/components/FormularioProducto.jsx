import React from "react";

export default function FormularioProducto({ nuevo, setNuevo, onSubmit }) {
  return (
    <form
      onSubmit={onSubmit}
      className="w-full max-w-md bg-white rounded-2xl shadow p-4 mb-6"
    >
      <div className="grid grid-cols-2 gap-2">
        <input
          type="text"
          placeholder="Código"
          value={nuevo.codigo}
          onChange={(e) => setNuevo({ ...nuevo, codigo: e.target.value })}
          className="border rounded-lg p-2"
        />
        <input
          type="text"
          placeholder="Descripción"
          value={nuevo.descripcion}
          onChange={(e) => setNuevo({ ...nuevo, descripcion: e.target.value })}
          className="border rounded-lg p-2"
        />
        <input
          type="number"
          placeholder="Precio 1"
          value={nuevo.precio1}
          onChange={(e) => setNuevo({ ...nuevo, precio1: e.target.value })}
          className="border rounded-lg p-2"
        />
        <input
          type="number"
          placeholder="Precio 2"
          value={nuevo.precio2}
          onChange={(e) => setNuevo({ ...nuevo, precio2: e.target.value })}
          className="border rounded-lg p-2"
        />
        <input
          type="text"
          placeholder="Ubicación"
          value={nuevo.ubicacion}
          onChange={(e) => setNuevo({ ...nuevo, ubicacion: e.target.value })}
          className="border rounded-lg p-2"
        />
        <input
          type="number"
          placeholder="Stock"
          value={nuevo.stock}
          onChange={(e) => setNuevo({ ...nuevo, stock: e.target.value })}
          className="border rounded-lg p-2"
        />
      </div>
      <textarea
        placeholder="Info adicional"
        value={nuevo.info}
        onChange={(e) => setNuevo({ ...nuevo, info: e.target.value })}
        className="border rounded-lg p-2 w-full mt-2"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white rounded-xl py-2 w-full mt-3"
      >
        Guardar
      </button>
    </form>
  );
}
