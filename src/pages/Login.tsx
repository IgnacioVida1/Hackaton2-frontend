import { useState } from "react";
import { useToken } from "../context/TokenContext";
import { useNavigate } from "react-router-dom";
// import axiosInstance from "../services/axiosInstance"; // <- Temporalmente no se usa

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { saveToken } = useToken();
  const navigate = useNavigate();

  async function handleLogin() {
    // Simula un login exitoso con un token válido
    const tokenDePrueba = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ3aXdpd2kyNEBnbWFpbC5jb20iLCJzY29wZXMiOlt7ImF1dGhvcml0eSI6IlJPTEVfQURNSU4ifV0sImlzcyI6Imh0dHA6Ly9kZXZnbGFuLmNvbSIsImlhdCI6MTc1MDM5MDMzMiwiZXhwIjoxNzUwNDA4MzMyfQ.idKT06ghBomd70rwXTjL3u6wiE19a5UAdhMmCEJCOyA";

    saveToken(tokenDePrueba);
    navigate("/selector-mes");
  }

  return (
    <div className="bg-gray-100 p-8 rounded-lg shadow-lg w-96 mx-auto mt-20">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Login (prueba con token)</h2>
      <div className="space-y-4">
        <input
          className="w-full px-4 py-2 border rounded-md"
          placeholder="Email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="w-full px-4 py-2 border rounded-md"
          placeholder="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          onClick={handleLogin}
        >
          Iniciar sesión de prueba
        </button>
      </div>
    </div>
  );
}

export default Login;
