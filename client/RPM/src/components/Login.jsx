import { useState } from "react"; 
import { useNavigate } from 'react-router-dom';
import Axios from "axios";
import '../CSS-Styles/Login.css';

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "userName") {
      setUserName(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const URL = 'http://localhost:8080/api/auth/login'; 
    const config = {
      userName,
      password,
    };
  
    try {
      const response = await Axios.post(URL, config);
  
      // Guardar tokens
      localStorage.setItem('accessToken', response.data.accessToken);
      localStorage.setItem('refreshToken', response.data.refreshToken);
  
  
      // Redirigir al menú si todo está correcto

      navigate("/menu");
    } catch (error) {
      if (error.response && error.response.data.message) {
          setError(error.response.data.message);
      } else {
          setError('Ocurrio un error inesperado.');
      }
  }
  };

  // useEffect(() => {
  //   console.log({ userName, password });
  // }, [userName, password]);

  return (
    <div className="form-container-login">
      <form onSubmit={handleSubmit}>
        <h2 className="titulo">Iniciar Sesion</h2>
        <div>
          <label htmlFor="userName">Nombre de usuario: </label>
          <input
            value={userName}
            type="text"
            name="userName"
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="password">Contraseña: </label>
          <input
            value={password}
            type="password"
            name="password"
            onChange={handleChange}
          />
        </div>

        {/* Mostrar error si existe */}
        {error && <div className="mensaje-error" style={{ color: "red" }}>{error}</div>}
        
        <button className="button-1" type="submit">Acceder</button>
      </form>
    </div>
  );
};

export default Login;
