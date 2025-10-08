import React from "react";

export default function Buscador({ valor, onChange }) {
  return (
    <input
      type="text"
      placeholder="Buscar por nombre..."
      value={valor}
      onChange={(e) => onChange(e.target.value)}
      className="border p-3 rounded-xl w-full mb-4 text-lg"
    />
  );
}
