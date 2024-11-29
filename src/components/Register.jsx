import React, { useState } from "react";
import { register } from "../api"; // Importa la función de registro

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    const data = await register(email, password);
    if (data.message) {
      setMessage("Usuario registrado con éxito. Ahora puedes iniciar sesión.");
    } else {
      setMessage("Error al registrarse.");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Registro</h2>
      <form onSubmit={handleRegister} className="mx-auto" style={{ maxWidth: "400px" }}>
        <div className="mb-3">
          <label className="form-label">Correo Electrónico</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Contraseña</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-success w-100">Registrar</button>
      </form>
      {message && <div className="alert alert-info mt-3">{message}</div>}
    </div>
  );
};

export default Register;
