export const isValidEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const isValidPassword = (password) => {
  return typeof password === 'string' && password.trim().length >= 6;
};

export const isValidName = (name) => {
  const regex = /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]{2,}$/;
  return regex.test(name);
};
