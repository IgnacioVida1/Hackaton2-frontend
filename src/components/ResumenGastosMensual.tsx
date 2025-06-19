import React, { useEffect, useState } from "react";
import { useToken } from "../context/TokenContext";
import { obtenerResumen } from "../services/ApiGasto";
import FormularioGasto from "./FormularioGasto";
import DetalleGastos from "./DetalleGastos";

interface CategoriaResumen {
  categoryId: number;
  categoryName: string;
  total: number;
}

interface Props {
  year: number;
  month: number;
}

const ResumenGastosMensual = ({ year, month }: Props) => {
  const { token } = useToken();
  const [resumen, setResumen] = useState<CategoriaResumen[]>([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<number | null>(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [error, setError] = useState("");

  const cargarResumen = async () => {
    try {
      if (!token) return;
      const data = await obtenerResumen(token, year, month);
      setResumen(data);
    } catch (e: any) {
      setError(e.message || "Error al cargar el resumen");
    }
  };

  useEffect(() => {
    cargarResumen();
  }, [token, year, month]);

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <h2 className="text-2xl font-semibold mb-4 text-center">Resumen por Categoría</h2>

      {error && (
        <div className="text-red-600 mb-4 bg-red-100 px-4 py-2 rounded">{error}</div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {resumen.map((categoria) => (
          <div
            key={categoria.categoryId}
            className={`border p-4 rounded-lg shadow cursor-pointer transition-transform hover:scale-105 ${
              categoriaSeleccionada === categoria.categoryId
                ? "bg-blue-100 border-blue-400"
                : "bg-gray-50"
            }`}
            onClick={() => {
              setCategoriaSeleccionada(categoria.categoryId);
              setMostrarFormulario(false); // reset formulario
            }}
          >
            <h3 className="text-lg font-bold">{categoria.categoryName}</h3>
            <p className="text-gray-700 text-xl">S/. {categoria.total.toFixed(2)}</p>
          </div>
        ))}
      </div>

      {categoriaSeleccionada && (
        <div className="text-center">
          <button
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
            onClick={() => setMostrarFormulario(!mostrarFormulario)}
          >
            {mostrarFormulario ? "Ocultar formulario y lista" : "Registrar / Borrar Gastos"}
          </button>
        </div>
      )}

      {mostrarFormulario && categoriaSeleccionada && (
        <div className="mt-6 space-y-6">
          <FormularioGasto
            year={year}
            month={month}
            categoryId={categoriaSeleccionada}
            onGastoCreado={cargarResumen}
          />
          <DetalleGastos
            year={year}
            month={month}
            categoryId={categoriaSeleccionada}
            onGastoEliminado={cargarResumen}
          />
        </div>
      )}
    </div>
  );
};

export default ResumenGastosMensual;
