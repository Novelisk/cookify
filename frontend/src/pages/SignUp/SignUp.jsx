import { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { signUp } from '../../utils/auth';
import {
  isValidEmail,
  isValidPassword,
  isValidName,
} from '../../utils/validator';

function SignUp() {
  const { login } = useContext(UserContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (
      formData.password &&
      formData.confirmPassword &&
      formData.password !== formData.confirmPassword
    ) {
      setPasswordMatch(false);
    } else {
      setPasswordMatch(true);
    }
  }, [formData.password, formData.confirmPassword]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!isValidName(formData.firstName)) {
      setError('Introduce un nombre válido (solo letras).');
      return;
    }

    if (!isValidName(formData.lastName)) {
      setError('Introduce un apellido válido (solo letras).');
      return;
    }

    if (!isValidEmail(formData.email)) {
      setError('Introduce un correo electrónico válido.');
      return;
    }

    if (!isValidPassword(formData.password)) {
      setError('La contraseña debe tener al menos 6 caracteres.');
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Ambas contraseñas deben ser idénticas.');
      return;
    }

    if (!passwordMatch) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    setIsLoading(true);

    try {
      const fullName = `${formData.firstName.trim()} ${formData.lastName.trim()}`;

      const data = await signUp({
        name: fullName,
        email: formData.email,
        password: formData.password,
      });

      if (!data || !data.user) {
        throw new Error(data?.message || 'Error al registrar el usuario.');
      }

      login({ name: data.user.name, email: data.user.email }, data.token);

      navigate('/main');
    } catch (err) {
      console.error(err);
      setError('Error al registrar el usuario.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="signup">
      <div className="signup__container">
        <h1 className="signup__title">Crea tu cuenta:</h1>

        <form className="signup__form" onSubmit={handleSubmit}>
          <label className="signup__label">
            Nombre:
            <input
              type="text"
              name="firstName"
              className="signup__input"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </label>

          <label className="signup__label">
            Apellido:
            <input
              type="text"
              name="lastName"
              className="signup__input"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </label>

          <label className="signup__label">
            Correo electrónico:
            <input
              type="email"
              name="email"
              className="signup__input"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>

          <label className="signup__label">
            Contraseña:
            <input
              type="password"
              name="password"
              className={`signup__input ${
                !passwordMatch && formData.confirmPassword
                  ? 'signup__input-error'
                  : ''
              }`}
              value={formData.password}
              onChange={handleChange}
              minLength="6"
              required
            />
          </label>

          <label className="signup__label">
            Repetir contraseña:
            <input
              type="password"
              name="confirmPassword"
              className={`signup__input ${
                !passwordMatch && formData.confirmPassword
                  ? 'signup__input-error'
                  : ''
              }`}
              value={formData.confirmPassword}
              onChange={handleChange}
              minLength="6"
              required
            />
          </label>

          {!passwordMatch && formData.confirmPassword && (
            <p className="signup__warning">Las contraseñas no coinciden.</p>
          )}

          {error && <p className="signup__error">{error} </p>}

          <button
            type="submit"
            className="signup__button"
            disabled={isLoading || !passwordMatch}
          >
            {isLoading ? 'Registrando...' : 'Registrarme'}
          </button>
        </form>

        <p className="signup__footer">
          ¿Ya tienes cuenta?{' '}
          <Link to="/signin" className="signup__link">
            Inicia sesión aquí
          </Link>
        </p>
      </div>
    </section>
  );
}

export default SignUp;
