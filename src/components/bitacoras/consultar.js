import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import Menu from '../../menu'; // Importa el componente de menú

const Consultar = () => {
    const navigate = useNavigate();
    const [bitacoras, setBitacoras] = useState([]);

    const fetchBitacoras = async () => {
        try {
            const response = await fetch(`http://localhost:8000/consultarTodasBitacoras`);
            const data = await response.json();
            console.log('Respuesta de la API:', data); // Verifica la estructura de la respuesta
            setBitacoras(data.bitacoras || []);  // Asigna el array de bitácoras
        } catch (error) {
            console.error("Error al obtener las bitácoras:", error);
            setBitacoras([]);  // En caso de error, setea un array vacío
        }
    };

    // Función para redirigir a la página de modificación
    const handleModify = (rowData) => {
        navigate(`/modificar`, { state: rowData });
    };

    // Función para eliminar un registro
    const handleDelete = async (rowData) => {
        try {
            const response = await fetch(`http://localhost:8000/bitacoras/${rowData.idBitacora}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            const data = await response.json();
            if (data.estatus === 'OK') {
                console.log("Bitácora eliminada:", rowData);
                setBitacoras(bitacoras.filter((item) => item.idBitacora !== rowData.idBitacora));
            } else {
                console.error("Error al eliminar bitácora:", data.mensaje);
            }
        } catch (error) {
            console.error("Error al eliminar la bitácora:", error);
        }
    };

    // Componente para los botones de acción
    const actionTemplate = (rowData) => {
        return (
            <>
                <Button
                    label="Modificar"
                    icon="pi pi-pencil"
                    className="p-button-text p-button-rounded p-button-warning"
                    onClick={() => handleModify(rowData)}
                />
                <Button
                    label="Eliminar"
                    icon="pi pi-trash"
                    className="p-button-text p-button-rounded p-button-danger"
                    onClick={() => handleDelete(rowData)}
                />
            </>
        );
    };

    // Llamamos a la función para obtener las bitácoras cuando el componente se monta
    useEffect(() => {
        fetchBitacoras();
    }, []);  // El array vacío significa que solo se ejecuta una vez al montar el componente

    return (
        <div>
            <Menu /> {/* El menú aparecerá aquí */}
            <div className="card App3">
                <h1>Ver Bitacoras</h1>
                <p>Aquí podrás Modificar o Eliminar</p>
                <DataTable value={bitacoras} tableStyle={{ minWidth: '50rem' }}>
                    <Column field="alumno.nControl" header="Num Control" />
                    <Column field="alumno.nombreAlumno" header="Nombre" />
                    <Column field="alumno.aPaterno" header="Apellido" />
                    <Column field="fecha" header="Fecha" />
                    <Column field="hEntrada" header="Hora Entrada" />
                    <Column field="hSalida" header="Hora Salida" />
                    <Column field="clase" header="Clase" />
                    <Column field="siesta" header="Siesta" />
                    <Column field="desayuno" header="Desayuno" />
                    <Column body={actionTemplate} header="Acciones" />
                </DataTable>
            </div>
        </div>
    );
};

export default Consultar;
