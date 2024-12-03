import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api"; // Importa la función de login
import '../login.css'; // Importa el archivo CSS

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Hook para redirigir al dashboard

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const data = await login(email, password); // Llama a la API de login
      if (data.token) {
        localStorage.setItem("token", data.token); // Guarda el token en el localStorage
        navigate("/dashboard"); // Redirige al dashboard
      } else {
        setError("Credenciales incorrectas");
      }
    } catch (err) {
      setError("Error en el inicio de sesión");
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <h2 className="text-center">Iniciar Sesión</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">Correo Electrónico</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <div className="alert alert-danger">{error}</div>}
          <button type="submit" className="btn btn-primary w-100">
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
