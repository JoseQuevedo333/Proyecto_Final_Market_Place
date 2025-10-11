const BASE_URL = "https://backendmarketplace-h8yv.onrender.com";
const PRODUCTOS_URL = `${BASE_URL}/productos`;

/**
 * 🔹 Obtener todos los productos
 */
export async function getProductos() {
  try {
    const res = await fetch(PRODUCTOS_URL);
    if (!res.ok) throw new Error("Error al obtener productos");
    return await res.json();
  } catch (err) {
    console.error("getProductos:", err);
    return [];
  }
}

/**
 * 🔹 Obtener un producto por su ID
 */
export async function getProductoById(id) {
  try {
    const res = await fetch(`${PRODUCTOS_URL}/${id}`);
    if (!res.ok) throw new Error("Error al obtener producto");
    return await res.json();
  } catch (err) {
    console.error("getProductoById:", err);
    return null;
  }
}

/**
 * 🔹 Crear un nuevo producto
 */
export async function crearProducto(producto) {
  try {
    const res = await fetch(PRODUCTOS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(producto),
    });
    if (!res.ok) throw new Error("Error al crear producto");
    return await res.json();
  } catch (err) {
    console.error("crearProducto:", err);
    return null;
  }
}

/**
 * 🔹 Eliminar un producto por ID
 */
export async function eliminarProducto(id) {
  try {
    const res = await fetch(`${PRODUCTOS_URL}/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Error al eliminar producto");
    return true;
  } catch (err) {
    console.error("eliminarProducto:", err);
    return false;
  }
}

/**
 * 🔐 Verifica si el usuario está autenticado
 */
export async function checkAuth(token) {
  try {
    const res = await fetch(`${BASE_URL}/protected/ping`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      console.warn("Token inválido o expirado");
      return { ok: false };
    }

    const data = await res.json();
    return { ok: true, user: data.user, timestamp: data.ts };
  } catch (err) {
    console.error("checkAuth error:", err);
    return { ok: false, error: err.message };
  }
}

export { BASE_URL, PRODUCTOS_URL };
