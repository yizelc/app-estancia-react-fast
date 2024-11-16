import React, { useState } from 'react';
import { FloatLabel } from 'primereact/floatlabel';
import { Password } from 'primereact/password';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';  // Para el botón de inicio de sesión
import { Toast } from 'primereact/toast';    // Para mostrar mensajes de error o éxito
import './styles/login.css';  // Asegúrate de importar el archivo CSS
import { Link } from 'react-router-dom';
import loginImage from './logo.jpg'; // Importa la imagen (ajusta la ruta según tu estructura de proyecto)

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const toast = React.useRef(null);

  // Función para manejar el inicio de sesión
  const handleLogin = () => {
    if (username === '' || password === '') {
      setErrorMessage('Por favor ingrese ambos campos');
      toast.current.show({ severity: 'error', summary: 'Error', detail: 'Usuario o contraseña incorrectos', life: 3000 });
    } else {
      // Aquí puedes agregar la lógica de autenticación
      console.log('Usuario:', username);
      console.log('Contraseña:', password);
      toast.current.show({ severity: 'success', summary: 'Éxito', detail: 'Inicio de sesión exitoso', life: 3000 });
    }
  };

  return (
    <div className="App2">
      <h2>Iniciar sesión</h2>
      <div className="login-image-container">
        <img src={loginImage} alt="Login" className="login-image" /> {/* Añadir la imagen */}
      </div>
      <div className="p-fluid">
        {/* Campo de nombre de usuario */}
        <div className="input-field">
          <FloatLabel>
            <InputText
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoFocus
              placeholder="Ingresa tu usuario"
            />
            <label htmlFor="username">Username</label>
          </FloatLabel>
        </div>

        {/* Campo de contraseña */}
        <div className="input-field">
          <FloatLabel>
            <Password
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              feedback={false}
              placeholder="Ingresa tu contraseña"
              toggleMask
            />
            <label htmlFor="password">Password</label>
          </FloatLabel>
        </div>

        {/* Mensaje de error */}
        {errorMessage && <div className="p-error">{errorMessage}</div>}

        {/* Botón de inicio de sesión */}
        <Link to="../home">
          <Button label="Iniciar sesión" icon="pi pi-sign-in" onClick={handleLogin}  />
        </Link>

        {/* Componente Toast para mensajes */}
        <Toast ref={toast} />
      </div>
    </div>
  );
};

export default Login;
