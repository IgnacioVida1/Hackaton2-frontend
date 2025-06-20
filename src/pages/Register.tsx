import { useState } from "react";
import { useToken } from "../context/TokenContext";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../services/axiosInstance";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { saveToken } = useToken();
  const navigate = useNavigate();

  async function handleRegister() {
    try {
      const response = await axiosInstance.post("/frontend/authentication/register", {
        email,
        passwd: password,
      });

      const token = response.data.result.token;
      saveToken(token);
      navigate("/login");
    } catch (error: any) {
      alert("Error al registrar: " + (error?.response?.data?.message || error.message));
      console.error("Register failed:", error);
    }
  }

  return (
    <div className="bg-gray-100 p-8 rounded-lg shadow-lg w-96 mx-auto mt-20">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Register</h2>
      <div className="space-y-4">
        <input
          className="w-full px-4 py-2 border rounded-md"
          placeholder="Email"
          type="email"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="w-full px-4 py-2 border rounded-md"
          placeholder="Password"
          type="password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          onClick={handleRegister}
        >
          Registrarse
        </button>
      </div>
    </div>
  );
}

export default Register;
