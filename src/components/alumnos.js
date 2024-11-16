import React, { useState, useEffect } from 'react';
import Menu from '../menu'; // Importa el componente de menú
import { DataTable } from 'primereact/datatable'; // Importa el componente de tabla de PrimeReact
import { Column } from 'primereact/column'; // Importa la columna para la tabla
import { Card } from 'primereact/card'; // Importa el componente Card de PrimeReact
import '../styles/pages.css';

const Alumnos = () => {
    const [alumnos, setAlumnos] = useState([]);

    useEffect(() => {
        const fetchAlumnos = async () => {
            try {
                const response = await fetch('http://localhost:8000/consultarAlumnos');
                const data = await response.json();
                setAlumnos(data); // Asigna los datos de la API al estado
            } catch (error) {
                console.error("Error al obtener los alumnos:", error);
            }
        };

        fetchAlumnos();
    }, []);

    return (
        <div>
            <Menu /> {/* El menú aparecerá aquí */}

            {/* Card para centrar la tabla */}
            <div className="alumnos-container">
                <h1>Bienvenido al panel de Alumnos</h1>
                <p>Aquí va el contenido de la página.</p>
                <Card className="datatable-card">
                    <DataTable value={alumnos} tableStyle={{ minWidth: '50rem' }}>
                        <Column field="nControl" header="Número de Control" />
                        <Column field="nombreAlumno" header="Nombre" />
                        <Column field="aPaterno" header="Apellido Paterno" />
                        <Column field="aMaterno" header="Apellido Materno" />
                    </DataTable>
                </Card>
            </div>
        </div>
    );
};

export default Alumnos;
