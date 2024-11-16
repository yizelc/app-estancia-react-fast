import '../../styles/pages.css'; // Asegúrate de tener los estilos de PrimeReact en tu proyecto
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Calendar } from 'primereact/calendar';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import Menu from '../../menu'; // Importa el componente de menú

const Modificar = () => {
    const navigate = useNavigate();
    const { state } = useLocation(); // Recibe los datos de la fila seleccionada
    const [bitacora, setBitacora] = useState({
        ...state, // Inicializa con los datos recibidos
        fecha: new Date(state.fecha),
    });

    // Función para manejar cambios en los campos del formulario
    const handleChange = (e, field) => {
        setBitacora({ ...bitacora, [field]: e.target.value });
    };

    // Función para guardar cambios
    const handleSave = async () => {
        try {
            const response = await fetch(`http://localhost:8000/bitacoras/${bitacora.idBitacora}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nControl: bitacora.alumno.nControl,
                    fecha: bitacora.fecha,
                    hEntrada: bitacora.hEntrada,
                    hSalida: bitacora.hSalida,
                    clase: bitacora.clase,
                    siesta: bitacora.siesta,
                    desayuno: bitacora.desayuno
                })
            });
            const data = await response.json();
            if (data.estatus === 'OK') {
                console.log("Datos guardados:", bitacora);
                navigate('/consultar'); // Regresa a la vista de bitácoras después de guardar
            } else {
                console.error("Error al guardar datos:", data.mensaje);
            }
        } catch (error) {
            console.error("Error al guardar los datos:", error);
        }
    };

    // Función para cancelar y regresar sin guardar
    const handleCancel = () => {
        navigate('/consultar');
    };

    return (
        <div>
            <Menu /> {/* El menú aparecerá aquí */}
            

            <div className="form-container App2">
            <h2>Modificar Bitácora</h2>
                <div className="p-fluid">
                    {/* Campos no editables */}
                    <div className="field">
                        <label>Número</label>
                        <InputText value={bitacora.numero} disabled />
                    </div>
                    <div className="field">
                        <label>Num Control</label>
                        <InputText value={bitacora.alumno.nControl} disabled />
                    </div>
                    <div className="field">
                        <label>Nombre</label>
                        <InputText value={bitacora.alumno.nombreAlumno} disabled />
                    </div>
                    <div className="field">
                        <label>Apellido</label>
                        <InputText value={bitacora.alumno.aPaterno} disabled />
                    </div>

                    {/* Campos editables */}
                    <div className="field">
                        <label>Fecha</label>
                        <Calendar value={bitacora.fecha} onChange={(e) => handleChange(e, 'fecha')} dateFormat="yy-mm-dd" />
                    </div>
                    <div className="field">
                        <label>Hora Entrada</label>
                        <InputText value={bitacora.hEntrada} onChange={(e) => handleChange(e, 'hEntrada')} />
                    </div>
                    <div className="field">
                        <label>Hora Salida</label>
                        <InputText value={bitacora.hSalida} onChange={(e) => handleChange(e, 'hSalida')} />
                    </div>
                    <div className="field">
                        <label>Clase</label>
                        <InputTextarea value={bitacora.clase} onChange={(e) => handleChange(e, 'clase')} rows={3} />
                    </div>
                    <div className="field">
                        <label>Siesta</label>
                        <InputTextarea value={bitacora.siesta} onChange={(e) => handleChange(e, 'siesta')} rows={2} />
                    </div>
                    <div className="field">
                        <label>Desayuno</label>
                        <InputTextarea value={bitacora.desayuno} onChange={(e) => handleChange(e, 'desayuno')} rows={3} />
                    </div>

                    {/* Botones de acción */}
                    <div className="buttons">
                        <Button label="Guardar" icon="pi pi-check" onClick={handleSave} className="p-button-success" />
                        <Button label="Cancelar" icon="pi pi-times" onClick={handleCancel} className="p-button-secondary" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modificar;
