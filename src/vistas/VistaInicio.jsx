import React, { useState } from "react";
import ItemVista from "../components/ItemVista";
import CarritoVista from "../components/CarritoVista";
import { useNavigate } from "react-router-dom";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import app from "/src/firebase.js";

export default function VistaInicio({ productos, setProductos }) {
  const navigate = useNavigate();
  const [busqueda, setBusqueda] = useState("");
  const [carrito, setCarrito] = useState([]);
  const [tab, setTab] = useState("productos");

  // --- Cargar listaLocal inicial desde localStorage ---
  if (productos.length === 0) {
    const lista = JSON.parse(localStorage.getItem("listaLocal") || "[]");
    setProductos(lista);
  }

  const productosFiltrados = productos.filter((p) =>
    p.descripcion.toLowerCase().includes(busqueda.toLowerCase())
  );

  const agregarAlCarrito = (producto) => {
    const existe = carrito.find((c) => c.codigo === producto.codigo);
    if (existe) {
      setCarrito(
        carrito.map((c) =>
          c.codigo === producto.codigo ? { ...c, cantidad: c.cantidad + 1 } : c
        )
      );
    } else {
      setCarrito([...carrito, { ...producto, cantidad: 1 }]);
    }
  };

  const eliminarProducto = (codigo) => {
    setProductos((prev) => {
      const actualizado = prev.filter((p) => p.codigo !== codigo);
      localStorage.setItem("listaLocal", JSON.stringify(actualizado));
      return actualizado;
    });
  };

  // VistaInicio.js
  const editarProducto = (productoActualizado) => {
    setProductos((prev) => {
      const actualizado = prev.map((p) =>
        p.codigo === productoActualizado.codigo ? productoActualizado : p
      );
      localStorage.setItem("listaLocal", JSON.stringify(actualizado));
      return actualizado;
    });
  };

  // --- Obtener productos desde Firebase ---
  const obtenerProductosFirebase = async () => {
    const db = getFirestore(app);
    const docRef = doc(db, "Ferre", "productos");
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) return [];

    return docSnap.data().productos.map((f) => ({
      codigo: f.codigo,
      descripcion: f.descripcion,
      precio1: f.precio1,
      precio2: f.precio2,
      ubicacion: "",
      stock: 0,
      info: "",
    }));
  };

  // --- Actualizar listaLocal al presionar "Obtener" ---
  const actualizarLista = async () => {
    const listaFirebase = await obtenerProductosFirebase();
    let listaLocal = JSON.parse(localStorage.getItem("listaLocal") || "[]");

    // Si no existe listaLocal, la creamos
    if (listaLocal.length === 0) listaLocal = listaFirebase;
    else {
      // Si existe, actualizamos precios por código y agregamos nuevos
      const mapaFirebase = new Map(listaFirebase.map((f) => [f.codigo, f]));
      listaLocal = [
        ...listaLocal.map((l) => {
          const f = mapaFirebase.get(l.codigo);
          return f ? { ...l, precio1: f.precio1, precio2: f.precio2 } : l;
        }),
        ...listaFirebase.filter(
          (f) => !listaLocal.some((l) => l.codigo === f.codigo)
        ),
      ];
    }

    setProductos(listaLocal);
    localStorage.setItem("listaLocal", JSON.stringify(listaLocal));
  };

  return (
    <div className="w-full max-w-md mx-auto p-4">
      {/* Tabs */}
      <div className="flex mb-4 justify-around">
        <button
          className={`px-4 py-2 rounded-t-xl ${
            tab === "productos" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => setTab("productos")}
        >
          Productos
        </button>
        <button
          className={`px-4 py-2 rounded-t-xl ${
            tab === "carrito" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => setTab("carrito")}
        >
          Carrito ({carrito.length})
        </button>
      </div>

      {tab === "productos" && (
        <>
          <input
            type="text"
            placeholder="Buscar por nombre..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="border p-3 rounded-xl w-full mb-4 text-lg"
          />

          <button
            onClick={() => navigate("/agregar")}
            className="mb-4 w-full bg-green-500 text-white rounded-xl py-2 text-lg"
          >
            Agregar Producto
          </button>

          <button
            onClick={actualizarLista}
            className="mb-4 w-full bg-blue-500 text-white rounded-xl py-2 text-lg"
          >
            Obtener/Actualizar Lista Firebase
          </button>

          {productosFiltrados.length === 0 ? (
            <p className="text-center text-gray-500">Sin productos</p>
          ) : (
            productosFiltrados.map((p) => (
              <ItemVista
                key={p.codigo}
                item={p}
                onAgregar={agregarAlCarrito}
                onEditar={editarProducto} // ya existente
                onEliminar={() => eliminarProducto(p.codigo)} // nueva función
              />
            ))
          )}
        </>
      )}

      {tab === "carrito" && (
        <CarritoVista
          carrito={carrito}
          setCarrito={setCarrito}
          confirmarCompra={() => {
            const actualizada = productos.map((p) => {
              const c = carrito.find((ci) => ci.codigo === p.codigo);
              return c ? { ...p, stock: (p.stock || 0) - c.cantidad } : p;
            });
            setProductos(actualizada);
            setCarrito([]);
            localStorage.setItem("listaLocal", JSON.stringify(actualizada));
            alert("Compra confirmada!");
          }}
        />
      )}
    </div>
  );
}
