import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { signIn } from '../../utils/auth';

function SignIn() {
  const { login } = useContext(UserContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const data = await signIn(formData.email, formData.password);

      login({ email: data.email }, data.token);
      navigate('/main');
    } catch (err) {
      console.error(err);
      setError('Credenciales inválidas');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="signin">
      <div className="signin__container">
        <h1 className="signin__title">Iniciar sesión</h1>

        <form className="signin__form" onSubmit={handleSubmit}>
          <label className="signin__label">
            Email
            <input
              type="email"
              name="email"
              className="signin__input"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>

          <label className="signin__label">
            <input
              type="password"
              name="password"
              className="signin__input"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </label>

          {error && <p className="signin__error">{error} </p>}

          <button type="submit" className="signin__button" disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Ingresar'}
          </button>
        </form>

        <p className="signin__footer">
          ¿Aún no tienes cuenta?{' '}
          <Link to="/signup" className="signin__link">
            Regístrate aquí
          </Link>
        </p>
      </div>
    </section>
  );
}

export default SignIn;
