import { useState } from "react";
import { useToken } from "../context/TokenContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login(){

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { saveToken } = useToken();
    const navigate = useNavigate();

    async function handleLogin() {
    try {
    const response = await axios.post("/frontend/authentication/login", {
      email,
      passwd: password,
    }, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("Login successful:", response.data);
    saveToken(response.data.token);
    navigate("/expenses_summary");
    } catch (error :any) {
        console.error("Login failed:", error);
        alert("Login failed. Please check your credentials and try again.\n"+error.message);
    }
  }
    return (
        <div className="bg-gray-100 p-8 rounded-lg shadow-lg w-96 mx-auto flex flex-col items-center mt-30">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Login
      </h2>
      <div className="space-y-4">
        <input
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
          placeholder="Email"
          type="email" required
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
          placeholder="Password"
          type="password" required
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors duration-200 font-semibold"
          onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
    );
}

export default Login;