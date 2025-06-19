import { Link } from "react-router-dom";
import { useToken } from "../context/TokenContext";

const Navbar = () => {
  const { token, removeToken } = useToken();

  return (
    <nav className="w-screen bg-gray-300 text-gray-950 shadow-lg">
      <div className="mx-auto px-40">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl font-bold">GastosApp</Link>
          <ul className="flex gap-10">
            {!token && (
              <>
                <li>
                  <Link to="/register" className="hover:text-blue-600">Registro</Link>
                </li>
                <li>
                  <Link to="/login" className="hover:text-blue-600">Iniciar Sesión</Link>
                </li>
              </>
            )}
            {token && (
              <>
                <li>
                  <Link to="/selector-mes" className="hover:text-blue-600">Resumen</Link>
                </li>
                <li>
                  <button onClick={removeToken} className="hover:text-red-500">Cerrar Sesión</button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
