// src/pages/Home.js
import React from 'react';
import Menu from './menu'; // Importa el componente de menú
import './styles/pages.css';
import loginImage from './logo.jpg'; // Importa la imagen (ajusta la ruta según tu estructura de proyecto)


const Home = () => {
    return (
        <div >
            <Menu /> {/* El menú aparecerá aquí */}
            <div className="App3">
            <h1>Bienvenido a la Página Principal</h1>
            <p>Aquí va el contenido de tu página de inicio.</p>
            </div>
           
            <div className="card flex justify-content-center alumnos-container">
            <img src={loginImage} alt="Login"  /> {/* Añadir la imagen */}
            </div>
        </div>
       
    );
    
};

export default Home;



