import React from 'react';
import './App.css'; // Tu CSS personalizado
import 'primereact/resources/themes/saga-blue/theme.css'; // Tema de PrimeReact
import 'primereact/resources/primereact.min.css';        // Estilos básicos de PrimeReact
import 'primeicons/primeicons.css';                      // Estilos de iconos de PrimeReact
import Home from './home';
import Login from './login';


// src/App.js
import { Route, Routes, BrowserRouter } from 'react-router-dom';

import Alumnos from './components/alumnos'; // Página de usuarios
import Bitacoras from './components/bitacoras'; // Página de bitácoras
import Plan from './components/planeaciones'; // Página de planeaciones
import Recursos from './components/recursos'; // Página de recursos
import AgregarBitacora from './components/bitacoras/agregar'; // Página de AGREGAR Bitacoras
import Consultar from './components/bitacoras/consultar'; // Página de Ver Bitacoras
import Modificar from './components/bitacoras/modificar'; // Página de Ver Bitacoras




function App() {
  return (
    <BrowserRouter>
      <Routes>


      <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/alumnos" element={<Alumnos />} />
        <Route path="/bitacoras" element={<Bitacoras />} />
        <Route path="/planeaciones" element={<Plan />} />
        <Route path="/recursos" element={<Recursos />} />
        <Route path="/login" element={<Login />} />

        <Route path="/components/bitacoras/agregar/:ncontrol" element={<AgregarBitacora />} />
        <Route path="/consultar" element={<Consultar />} />
        <Route path="/modificar" element={<Modificar />} />




        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
