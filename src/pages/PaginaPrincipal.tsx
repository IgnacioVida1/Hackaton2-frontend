import React, { useState } from "react";
import { useParams } from "react-router-dom";
import ResumenGastosMensual from "../components/ResumenGastosMensual";
import FormularioGasto from "../components/FormularioGasto";

const PaginaPrincipal: React.FC = () => {
  const { year, month } = useParams<{ year: string; month: string }>();
  const numericYear = parseInt(year || "");
  const numericMonth = parseInt(month || "");

  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  if (isNaN(numericYear) || isNaN(numericMonth)) {
    return (
      <div className="text-center mt-20 text-red-600 text-lg">
        <h2>Parámetros inválidos</h2>
        <p>Por favor selecciona un mes válido desde el selector.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-bold text-blue-800 mb-2">Resumen de Gastos Mensual</h1>
        <p className="text-gray-600 mb-6">Año: {numericYear} — Mes: {numericMonth + 1}</p>

        <button
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
          onClick={() => setMostrarFormulario(!mostrarFormulario)}
        >
          {mostrarFormulario ? "Ocultar Formulario de Gasto" : "Registrar Gasto"}
        </button>
      </header>

      {mostrarFormulario && (
        <div className="mb-10">
          <FormularioGasto
            year={numericYear}
            month={numericMonth}
            categoryId={null}
            onGastoCreado={() => {
              setMostrarFormulario(false);
              window.location.reload();
            }}
          />
        </div>
      )}

      <ResumenGastosMensual
        year={numericYear}
        month={numericMonth}
      />
    </div>
  );
};

export default PaginaPrincipal;
