const API_URL = "https://rauwback.zapto.org:4000"; // Cambia esto a la URL de tu back-end si está desplegado

// Función para registrar un usuario
export const register = async (email, password) => {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  return await response.json();
};

// Función para hacer login de un usuario
export const login = async (email, password) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  return await response.json();
};

// Función para obtener los productos
export const getProducts = async () => {
  const response = await fetch(`${API_URL}/products`);
  return await response.json();
};

// Función para agregar un producto
export const addProduct = async (name, price) => {
  const response = await fetch(`${API_URL}/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, price }),
  });

  return await response.json();
};

// Editar producto
export const updateProduct = async (id, name, price) => {
  const response = await fetch(`${API_URL}/products/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, price }),
  });

  if (!response.ok) {
    throw new Error("Error al actualizar producto");
  }

  return await response.json();
};

// Función para eliminar un producto
export const deleteProduct = async (id) => {
  const response = await fetch(`${API_URL}/products/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Error al eliminar el producto");
  }

  return await response.json();
};
