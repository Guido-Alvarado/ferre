import { getFirestore, doc, getDoc } from "firebase/firestore";
import app from '/src/firebase.js'
export async function obtenerProductosFirebase() {
  const db = getFirestore(app);
  const docRef = doc(db, "Ferre", "productos");
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const productosFirebase = docSnap.data().productos || [];

    // Transformar la lista para agregar campos locales
    const listaLocal = productosFirebase.map(f => ({
      codigo: f.codigo,
      descripcion: f.descripcion,
      precio1: f.precio1,
      precio2: f.precio2,
      ubicacion: "",
      stock: 0,
      info: "",
    }));

    return listaLocal;
  } else {
    return [];
  }
}
