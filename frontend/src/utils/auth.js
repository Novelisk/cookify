const BASE_URL = 'https://api.cookify.mooo.com/api';

const handleReponse = async (res) => {
  const data = await res.json();
  if (!res.ok) {
    const message = data.message || 'Error en la petición al servidor';
    throw new Error(message);
  }
  return data;
};

export async function signIn(email, password) {
  const res = await fetch(`${BASE_URL}/auth/signin`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  return handleReponse(res);
}

export async function signUp({ name, email, password }) {
  const res = await fetch(`${BASE_URL}/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
  });
  return handleReponse(res);
}

export async function validateToken(token) {
  const res = await fetch(`${BASE_URL}/users/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return handleReponse(res);
}
