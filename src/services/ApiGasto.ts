const API_URL = 'http://198.211.105.95:8080';

export const obtenerResumen = async (
  token: string,
  year: number,
  month: number
): Promise<any> => {
  const response = await fetch(
    `${API_URL}/expenses/summary?year=${year}&month=${month}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
  );

  if (!response.ok) {
    throw new Error('Error al obtener el resumen');
  }
  return response.json();
};

export const obtenerDetalle = async (
  token: string,
  year: number,
  month: number,
  categoryId: number
): Promise<any> => {
  const response = await fetch(
    `${API_URL}/expenses/detail?year=${year}&month=${month}&categoryId=${categoryId}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
  );

  if (!response.ok) {
    throw new Error('Error al obtener el detalle');
  }
  return response.json();
};

export const crearGasto = async (
  token: string,
  gasto: {
    description: string;
    amount: number;
    date: string;
    categoryId: number;
  }
): Promise<any> => {
  const response = await fetch(`${API_URL}/expenses`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(gasto),
  });

  if (!response.ok) {
    throw new Error('Error al crear el gasto');
  }
  return response.json();
};

export const eliminarGasto = async (
  token: string,
  id: number
): Promise<any> => {
  const response = await fetch(`${API_URL}/expenses/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Error al eliminar el gasto');
  }
  return response.json();
};