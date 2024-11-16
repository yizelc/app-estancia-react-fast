import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { InputMask } from 'primereact/inputmask';

const AgregarBitacora = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const nControl = location.pathname.split('/').pop(); // Obtiene el número de control desde la URL

    const [formData, setFormData] = useState({
        idBitacora: 0,
        fecha: '',  // Ahora fecha es una cadena vacía
        horaEntrada: '',
        horaSalida: '',
        clase: '',
        siesta: '',
        alimentos: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleDateChange = (e) => {
        setFormData({ ...formData, fecha: e.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Verifica que fecha esté definida y formateada correctamente
        const formattedDate = formData.fecha ? formData.fecha.toISOString().split('T')[0] : '';

        // Prepara el payload con el formato adecuado
        const payload = {
            nControl: nControl,
            fecha: formattedDate, // Formato YYYY-MM-DD
            hEntrada: `${formData.horaEntrada}:00`, // Formato HH:MM:SS
            hSalida: `${formData.horaSalida}:00`,   // Formato HH:MM:SS
            clase: formData.clase,
            siesta: formData.siesta,
            desayuno: formData.alimentos
        };

        try {
            const response = await fetch('http://localhost:8000/bitacoras', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                console.log('Bitácora registrada exitosamente');
                navigate('/bitacoras'); // Redirige a la vista de bitácoras
            } else {
                const errorData = await response.json();
                console.error('Error al registrar la bitácora:', errorData.detail); // Imprime el detalle del error
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
        }
    };

    const handleCancel = () => {
        navigate('/bitacoras');
    };

    return (
        <div className="card App2 p-fluid" style={{ maxWidth: '600px', margin: 'auto' }}>
            <h2>Formulario de Bitácora</h2>
            <form onSubmit={handleSubmit}>
                <div className="p-field">
                    <label>Número de Control: {nControl}</label> {/* Mostrar el número de control como un label */}
                </div>

                <div className="p-field">
                    <label htmlFor="fecha">Fecha</label>
                    <Calendar id="fecha" value={formData.fecha} onChange={handleDateChange} dateFormat="dd/mm/yy" />
                </div>

                <div className="p-field">
                    <label htmlFor="horaEntrada">Hora de Entrada</label>
                    <InputMask
                        id="horaEntrada"
                        mask="99:99"
                        value={formData.horaEntrada}
                        onChange={handleChange}
                        name="horaEntrada"
                        placeholder="HH:MM"
                    />
                </div>

                <div className="p-field">
                    <label htmlFor="horaSalida">Hora de Salida</label>
                    <InputMask
                        id="horaSalida"
                        mask="99:99"
                        value={formData.horaSalida}
                        onChange={handleChange}
                        name="horaSalida"
                        placeholder="HH:MM"
                    />
                </div>

                <div className="p-field">
                    <label htmlFor="clase">Clase</label>
                    <InputTextarea
                        id="clase"
                        value={formData.clase}
                        onChange={handleChange}
                        name="clase"
                        rows={3}
                        placeholder="Escribe aquí la clase"
                    />
                </div>

                <div className="p-field">
                    <label htmlFor="siesta">Siesta</label>
                    <InputTextarea
                        id="siesta"
                        value={formData.siesta}
                        onChange={handleChange}
                        name="siesta"
                        rows={3}
                        placeholder="Escribe aquí la siesta"
                    />
                </div>

                <div className="p-field">
                    <label htmlFor="alimentos">Alimentos</label>
                    <InputTextarea
                        id="alimentos"
                        value={formData.alimentos}
                        onChange={handleChange}
                        name="alimentos"
                        rows={3}
                        placeholder="Escribe aquí los alimentos"
                    />
                </div>

                <div className="p-d-flex p-jc-between">
                    <Button label="Aceptar" icon="pi pi-check" type="submit" className="p-button-success" />
                    <Button label="Cancelar" icon="pi pi-times" className="p-button-danger" onClick={handleCancel} />
                </div>
            </form>
        </div>
    );
};

export default AgregarBitacora;
