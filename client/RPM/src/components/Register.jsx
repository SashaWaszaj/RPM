import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/api/auth/register', formData);
      console.log(response.data);

      navigate("/menu");
    } catch (error) {
      console.error(error);
      setError(error.response.data.mensaje);
    }
  };

  const handleCancel = () => {
    navigate("/menu");
};

  
  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h2 className="titulo">Crear usuario</h2>
        <div>
          <label htmlFor="userName">Nombre de usuario: </label>
          <input
          type="text"
          id="userName"
          name="userName"
          value={formData.userName}
          onChange={handleChange}
          />
        </div>
        <div>
        <label htmlFor="email">Correo: </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
         />
        </div>

        <div>
        <label htmlFor="password">Contraseña: </label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
         />
        </div>

        <div>
        <label htmlFor="confirmPassword">Confirmar contraseña: </label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
         />
        </div>
        
        <div className="mensaje-error">{error}</div>
        <div className='button-container'>
        <button className="button-1" role="button" type="submit">Registrar usuario</button>
        <button className="button-2" role="button" type="button" onClick={handleCancel}>Cancelar</button>
        </div>
      </form>
    </div>
  );
};

export default Register;