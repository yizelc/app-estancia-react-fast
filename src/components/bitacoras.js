import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Menu from '../menu'; // Importa el componente de menú
import { DataTable } from 'primereact/datatable'; // Importa el componente de tabla de PrimeReact
import { Column } from 'primereact/column'; // Importa la columna para la tabla
import { Card } from 'primereact/card'; // Importa el componente Card de PrimeReact
import { Button } from 'primereact/button'; // Importa el componente Button de PrimeReact
import '../styles/pages.css';

const Alumnos = () => {
    const navigate = useNavigate();
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

    // Función para manejar la acción del botón "Agregar"
    const handleAdd = (rowData) => {
        navigate(`/components/bitacoras/agregar/${rowData.nControl}`, { state: rowData });
    };

    // Componente para los botones de acción
    const actionTemplate = (rowData) => {
        return (
            <Button
                label="Agregar"
                icon="pi pi-plus"
                className="p-button-text p-button-rounded p-button-success"
                onClick={() => handleAdd(rowData)}
            />
        );
    };

    return (
        <div>
            <Menu /> {/* El menú aparecerá aquí */}

            {/* Card para centrar la tabla */}
            <div className="alumnos-container">
                <h1>Bienvenido al panel de Bitacoras</h1>
                <p>Aquí Podras Agregar Bitacoras.</p>
                <Card className="datatable-card">
                    <DataTable value={alumnos} tableStyle={{ minWidth: '50rem' }}>
                        <Column field="nControl" header="Número de Control" />
                        <Column field="nombreAlumno" header="Nombre" />
                        <Column field="aPaterno" header="Apellido Paterno" />
                        <Column field="aMaterno" header="Apellido Materno" />
                        <Column body={actionTemplate} header="Acciones" />
                    </DataTable>
                </Card>
            </div>
        </div>
    );
};

export default Alumnos;
