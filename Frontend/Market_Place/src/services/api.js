const API_URL = "http://localhost:5000/api/productos";

/**
 * 🔹 Obtener todos los productos
 */
export async function getProductos() {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("Error al obtener productos");
    return await res.json();
  } catch (err) {
    console.error("getProductos:", err);
    return [];
  }
}

/**
 * 🔹 Obtener un producto por su ID
 * @param {number} id - ID del producto
 */
export async function getProductoById(id) {
  try {
    const res = await fetch(`${API_URL}/${id}`);
    if (!res.ok) throw new Error("Error al obtener producto");
    return await res.json();
  } catch (err) {
    console.error("getProductoById:", err);
    return null;
  }
}

/**
 * 🔹 Crear un nuevo producto
 * @param {object} producto - Datos del producto {nombre, precio, description, image_url}
 */
export async function crearProducto(producto) {
  try {
    const res = await fetch(API_URL, {
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
 * @param {number} id - ID del producto
 */
export async function eliminarProducto(id) {
  try {
    const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Error al eliminar producto");
    return true;
  } catch (err) {
    console.error("eliminarProducto:", err);
    return false;
  }
}

/**
 * 🔐 Verifica si el usuario está autenticado
 * Llama a GET /api/protected/ping con el token JWT
 */
export async function checkAuth(token) {
  try {
    const res = await fetch(`${API_URL}/ping`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Enviamos token en el header
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
