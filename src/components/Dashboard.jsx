import React, { useState, useEffect } from "react";
import { getProducts, addProduct, deleteProduct, updateProduct } from "../api";

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [message, setMessage] = useState("");
  const [editingProduct, setEditingProduct] = useState(null);

  // Obtener los productos al cargar el componente
  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error("Error al obtener productos:", error);
    }
  };

  // Manejar el formulario para agregar o editar productos
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Si estamos editando un producto
    if (editingProduct) {
      try {
        await updateProduct(editingProduct._id, name, price);
        setMessage("Producto actualizado con éxito");
        setEditingProduct(null); // Limpiar el producto en edición
      } catch (error) {
        setMessage("Error al actualizar el producto");
        console.error(error);
      }
    } else {
      try {
        await addProduct(name, price);
        setMessage("Producto agregado con éxito");
      } catch (error) {
        
        console.error(error);
      }
    }

    // Reiniciar formulario y obtener los productos actualizados
    setName("");
    setPrice("");
    fetchProducts(); // Actualizar la lista de productos
  };

  // Función para eliminar un producto
  const handleDelete = async (id) => {
    try {
      await deleteProduct(id); // Llamar a la API para eliminar el producto
      setProducts(products.filter((product) => product._id !== id)); // Actualizar la lista de productos en el estado
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
    }
  };

  // Función para iniciar la edición de un producto
  const handleEdit = (product) => {
    setEditingProduct(product);
    setName(product.name);
    setPrice(product.price);
  };

  // Cargar los productos al montar el componente
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Dashboard</h2>

      {/* Mensaje de éxito o error */}
      {message && <div className="alert alert-info">{message}</div>}

      <div className="row">
        {/* Formulario para agregar o editar productos */}
        <div className="col-md-6 mb-4">
          <div className="card">
            <div className="card-header">
              <h4>{editingProduct ? "Editar Producto" : "Agregar Producto"}</h4>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                  <label>Nombre del Producto</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Nombre del producto"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label>Precio</label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Precio del producto"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  {editingProduct ? "Actualizar Producto" : "Agregar Producto"}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Lista de productos */}
        <div className="col-md-6 mb-4">
          <div className="card">
            <div className="card-header">
              <h4>Lista de Productos</h4>
            </div>
            <div className="card-body">
              <table className="table">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Precio</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {products.length === 0 ? (
                    <tr>
                      <td colSpan="3">No hay productos disponibles</td>
                    </tr>
                  ) : (
                    products.map((product) => (
                      <tr key={product._id}>
                        <td>{product.name}</td>
                        <td>{product.price}</td>
                        <td>
                          <button
                            className="btn btn-warning mr-2"
                            onClick={() => handleEdit(product)}
                          >
                            Editar
                          </button>
                          <button
                            className="btn btn-danger"
                            onClick={() => handleDelete(product._id)}
                          >
                            Eliminar
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
