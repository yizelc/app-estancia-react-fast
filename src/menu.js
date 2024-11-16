import React from 'react';
import { Menubar } from 'primereact/menubar';
import './styles/menu.css';  // Asegúrate de que la ruta sea correcta


const Menu = () => {
    // Items de menú
    const items = [
        {
            label: 'Inicio',
            icon: 'pi pi-home',
            command: () => window.location.href = '/home'
        },
        {
            label: 'Usuarios',
            icon: 'pi pi-users',
            items: [
                {
                    label: 'Alumnos',
                    icon: 'pi pi-user',
                    command: () => window.location.href = '/alumnos'
                },
                {
                    label: 'Tutores',
                    icon: 'pi pi-user'
                },
                {
                    label: 'Responsables',
                    icon: 'pi pi-user'
                },
                {
                    label: 'Educadoras',
                    icon: 'pi pi-user'
                }
            ]
        },
        {
            label: 'Bitacoras',
            icon: 'pi pi-book',
            items: [
                {
                    label: 'Ver Bitacoras',
                    icon: 'pi pi-calendar-plus',
                    command: () => window.location.href = '/consultar'
                    
                }, 
            {
                    label: 'Agregar Bitacora',
                    icon: 'pi pi-calendar-plus',
                    command: () => window.location.href = '/bitacoras'
                }]
            
        },
        {
            label: 'Planeaciones',
            icon: 'pi pi-calendar',
            command: () => window.location.href = '/planeaciones'
        },
        {
            label: 'Recursos',
            icon: 'pi pi-file-edit',
            command: () => window.location.href = '/recursos'
        }
    ];

    const endItems = [
        {
            label: 'Perfil',
            icon: 'pi pi-user',
            command: () => window.location.href = '#'
        },
        {
            label: 'Cerrar sesión',
            icon: 'pi pi-sign-out',
            command: () => window.location.href = '/login'
        }
    ];

    return (
        <div className="menubar-container">
            <Menubar model={items} />
            {/* Agregar botones extra al final */}
            <div className="menubar-end">
                {endItems.map(item => (
                    <button key={item.label} onClick={item.command} className="p-button p-component">
                        <i className={item.icon}></i> {item.label}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Menu;
