import { useState } from "react";
import { useToken } from "../context/TokenContext";
import { crearGasto } from "../services/ApiGasto";

interface FormularioGastoProps {
  categoryId: number | null;
  year: number;
  month: number;
  onGastoCreado: () => void;
}

const FormularioGasto = ({
  categoryId,
  year,
  month,
  onGastoCreado,
}: FormularioGastoProps) => {
  const { token } = useToken();
  const [formData, setFormData] = useState({
    description: "",
    amount: "",
    date: new Date(year, month, 1).toISOString().split("T")[0],
  });
  const [error, setError] = useState("");
  const [enviando, setEnviando] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) {
      setError("No autenticado");
      return;
    }

    if (!formData.description || !formData.amount || !formData.date) {
      setError("Todos los campos son obligatorios");
      return;
    }

    try {
      setEnviando(true);
      setError("");
      await crearGasto(token, {
        description: formData.description,
        amount: parseFloat(formData.amount),
        date: formData.date,
        categoryId: categoryId ?? 0,
      });

      setFormData({
        description: "",
        amount: "",
        date: new Date(year, month, 1).toISOString().split("T")[0],
      });

      onGastoCreado();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al crear gasto");
    } finally {
      setEnviando(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-100 p-6 rounded-lg shadow-md max-w-md mx-auto mb-6"
    >
      <h3 className="text-xl font-semibold mb-4 text-center text-blue-700">
        Registrar Gasto
      </h3>
      {error && (
        <div className="text-red-600 mb-3 bg-red-100 px-4 py-2 rounded">
          {error}
        </div>
      )}

      <div className="mb-4">
        <label className="block font-medium text-gray-700">Descripción</label>
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block font-medium text-gray-700">Monto (S/.)</label>
        <input
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          min="0.01"
          step="0.01"
          className="w-full border px-3 py-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block font-medium text-gray-700">Fecha</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
          required
        />
      </div>

      <button
        type="submit"
        disabled={enviando}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
      >
        {enviando ? "Registrando..." : "Registrar Gasto"}
      </button>
    </form>
  );
};

export default FormularioGasto;
