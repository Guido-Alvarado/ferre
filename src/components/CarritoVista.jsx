import React from "react";

export default function CarritoVista({ carrito, setCarrito, confirmarCompra }) {
  const cambiarCantidad = (codigo, cantidad) => {
    setCarrito(prev => prev.map(p => p.codigo === codigo ? { ...p, cantidad } : p));
  };

  const eliminarDelCarrito = (codigo) => {
    setCarrito(prev => prev.filter(p => p.codigo !== codigo));
  };

  const limpiarCarrito = () => setCarrito([]);

  const total = carrito.reduce((acc, p) => acc + p.precio1 * p.cantidad, 0);

  return (
    <div className="w-full max-w-md flex flex-col space-y-4">
      {carrito.length === 0 && <div>El carrito está vacío.</div>}

      {carrito.map((item) => (
        <div key={item.codigo} className="bg-white p-4 rounded-xl shadow flex justify-between items-center">
          <div>
            <div className="font-bold">{item.descripcion}</div>
            <div>${item.precio1} x{" "}
              <input
                type="number"
                min="1"
                value={item.cantidad}
                onChange={(e) => cambiarCantidad(item.codigo, Number(e.target.value))}
                className="border w-16 p-1 rounded"
              />
            </div>
          </div>
          <div className="font-bold">${item.precio1 * item.cantidad}</div>
          <button
            onClick={() => eliminarDelCarrito(item.codigo)}
            className="bg-red-500 text-white px-2 py-1 rounded ml-2"
          >
            X
          </button>
        </div>
      ))}

      {carrito.length > 0 && (
        <>
          <div className="font-bold text-lg text-right">Total: ${total}</div>
          <div className="flex justify-between">
            <button onClick={limpiarCarrito} className="bg-gray-500 text-white px-4 py-2 rounded-xl">Limpiar Carrito</button>
            <button onClick={confirmarCompra} className="bg-green-500 text-white px-4 py-2 rounded-xl">Confirmar Compra</button>
          </div>
        </>
      )}
    </div>
  );
}
