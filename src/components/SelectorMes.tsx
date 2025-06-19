import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const months = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

function SelectorMes() {
  const [selectedMonth, setSelectedMonth] = useState<number>(0);
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
  const navigate = useNavigate();

  const handleChangeMonth = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMonth(parseInt(e.target.value));
  };

  const handleChangeYear = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedYear(parseInt(e.target.value));
  };

  const handleGoToResumen = () => {
    navigate(`/expenses-summary/${selectedYear}/${selectedMonth}`);
  };

  return (
    <div className="bg-white p-6 rounded shadow-md max-w-md mx-auto mt-10">
      <h2 className="text-xl font-bold mb-4 text-center">Selecciona un mes y año</h2>
      <div className="flex flex-col gap-4">
        <label>
          Año:
          <input
            type="number"
            value={selectedYear}
            onChange={handleChangeYear}
            className="ml-2 border rounded px-2 py-1"
          />
        </label>
        <label>
          Mes:
          <select
            value={selectedMonth}
            onChange={handleChangeMonth}
            className="ml-2 border rounded px-2 py-1"
          >
            {months.map((month, idx) => (
              <option key={idx} value={idx}>{month}</option>
            ))}
          </select>
        </label>
        <button
          onClick={handleGoToResumen}
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Ver Resumen
        </button>
      </div>
    </div>
  );
}

export default SelectorMes;
