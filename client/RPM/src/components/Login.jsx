import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Axios from "axios";

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
    const URL = 'http://localhost:8080/product/login';
    const config = {
      userName,
      password
    };
    try {
      const response = await Axios.post(URL, config);
      console.log(response.data);
      // Navigate or handle success response
      navigate("/menu");
    } catch (error) {
      setError("Failed to login. Please check your credentials.");
      console.error("Login error:", error);
    }
  };

  useEffect(() => {
    console.log({ userName, password });
  }, [userName, password]);

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h2 className="titulo">Login</h2>
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

        {/* Show error if exists */}
        {error && <div className="mensaje-error" style={{ color: "red" }}>{error}</div>}
        
        <button className="button-1" type="submit">Acceder</button>
      </form>
    </div>
  );
};

export default Login;

