const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const handleReponse = async (res) => {
  const data = await res.json();
  if (!res.ok) {
    const message = data.message || 'Error en la petición al servidor';
    throw new Error(message);
  }
  return data;
};

export async function signIn(email, password) {
  const res = await fetch(`${BASE_URL}/api/auth/signin`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  return handleReponse(res);
}

export async function signUp({ name, email, password }) {
  const res = await fetch(`${BASE_URL}/api/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
  });
  return handleReponse(res);
}

export async function validateToken(token) {
  try {
    const res = await fetch(`${BASE_URL}/api/users/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.status === 401) {
      localStorage.removeItem('jwt');
      throw new Error('Token inválido o expirado.');
    }
    return handleReponse(res);
  } catch (err) {
    console.error('Error al validar token:', err);
    throw err;
  }
}
