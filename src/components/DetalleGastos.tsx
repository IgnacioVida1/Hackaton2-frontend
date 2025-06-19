import { useState, useEffect } from 'react';
import { useToken } from '../context/TokenContext';
import { obtenerDetalle, eliminarGasto } from '../services/ApiGasto';

interface Gasto {
  id: number;
  description: string;
  amount: number;
  date: string;
  categoryId: number;
}

interface DetalleGastosProps {
  categoryId: number | null;
  year: number;
  month: number;
  onGastoEliminado: () => void;
}

const DetalleGastos = ({ categoryId, year, month, onGastoEliminado }: DetalleGastosProps) => {
  const { token } = useToken();
  const [gastos, setGastos] = useState<Gasto[]>([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!token || !categoryId) return;

    const cargarDetalle = async () => {
      try {
        setCargando(true);
        setError('');
        const datos = await obtenerDetalle(token, year, month, categoryId);
        setGastos(datos);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
      } finally {
        setCargando(false);
      }
    };
    cargarDetalle();
  }, [token, categoryId, year, month]);

  const handleEliminar = async (id: number) => {
    if (!token) return;
    if (window.confirm('¿Eliminar este gasto?')) {
      try {
        await eliminarGasto(token, id);
        setGastos(gastos.filter(g => g.id !== id));
        onGastoEliminado();
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al eliminar gasto');
      }
    }
  };

  if (!token) return null;
  if (!categoryId) return <div className="mensaje">Selecciona una categoría para ver el detalle.</div>;
  if (cargando) return <div className="mensaje">Cargando detalle de gastos...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="detalle-gastos">
      <h3>🧾 Detalle de Gastos</h3>
      {gastos.length === 0 ? (
        <div className="mensaje">No hay gastos registrados para esta categoría.</div>
      ) : (
        <table className="tabla-gastos">
          <thead>
            <tr>
              <th>Descripción</th>
              <th>Monto</th>
              <th>Fecha</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {gastos.map(gasto => (
              <tr key={gasto.id}>
                <td>{gasto.description}</td>
                <td>S/. {gasto.amount.toFixed(2)}</td>
                <td>{new Date(gasto.date).toLocaleDateString()}</td>
                <td>
                  <button className="btn-eliminar" onClick={() => handleEliminar(gasto.id)}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DetalleGastos;