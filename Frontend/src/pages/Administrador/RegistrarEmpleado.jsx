import "../../design/RegistrarEmpleado.css"
import logo from "../../design/Logo.png";
import MenuSuperiorAdministrador from "../../components/MenuSuperiorAdministrador";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";

const RegistrarEmpleado = () => {

    const [dataForm, SetDataForm] = useState({})
    const [opcionSeleccionada, setOpcionSeleccionada] = useState('');
    const [nombres, setNombres] = useState([])
    

    const getNombres = async () => {
        const allNombres = await fetch("http://localhost:3000/departamentos/nombres")
        const nombresJson = await allNombres.json()
        setNombres(nombresJson.data)        
    }

    const manejarCambio = (evento) => {
        setOpcionSeleccionada(evento.target.value);
        SetDataForm({
            ...dataForm,
            Dnombre: evento.target.value
        });
    };

    const handlerFormInput = (e) => {
        SetDataForm(
            {
                ...dataForm,
                [e.target.name]: e.target.value
            }
        )
    }

    const handlerFormSubmit = async (e) => {
        e.preventDefault()
        console.log(dataForm)
        await fetch("http://localhost:3000/empleados", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dataForm)
        })
    }


    useEffect(() => {
        getNombres()
    }, [])    
    
    return (
        <div>
            <MenuSuperiorAdministrador />
            <div id="Panel1">
                <div id="contenedor1">
                    <div id="top">
                        <h1 id="txt1">Registrar Empleado</h1>
                    </div>
                    <form onSubmit={handlerFormSubmit}>
                        <div id="Ingresos">
                            <div id="ingresos1">
                                <input id="tb-cedula" onChange={handlerFormInput} value={dataForm.cedula} type="text" name="cedula" placeholder="Cedula..." required></input>
                                <h2 id="h-cedula">Cédula</h2>
                            </div>
                            <div id="ingresos2">
                                <input id="tb-nombre" onChange={handlerFormInput} value={dataForm.nombre} type="text" name="nombre" placeholder="Nombre..." required></input>
                                <h2 id="h-nombre">Nombre</h2>
                            </div>
                        </div>
                        <div id="Ingresos">
                            <div id="ingresos1">
                                {/*Entrada de fecha aquí*/}
                                <input id="tb-fechaNac" onChange={handlerFormInput} value={dataForm.fechaNac} type="date" name="fechaNac" placeholder="Fecha de Nacimiento..." required></input>
                                <h2 id="h-fechaNac">Fecha de Nacimiento</h2>
                            </div>
                            <div id="ingresos2">
                                <input id="tb-direccion" onChange={handlerFormInput} value={dataForm.direccion} type="text" name="direccion" placeholder="Direccion..." required></input>
                                <h2 id="h-direccion">Dirección</h2>
                            </div>
                        </div>
                        <div id="Ingresos">
                            <div id="ingresos1">
                                <input id="tb-email" onChange={handlerFormInput} value={dataForm.email} type="text" name="email" placeholder="Email..." required></input>
                                <h2 id="h-email">E-mail</h2>
                            </div>
                            <div id="ingresos2">
                                <input id="tb-telefono" onChange={handlerFormInput} value={dataForm.telefono} type="text" name="telefono" placeholder="Teléfono..." required></input>
                                <h2 id="h-telefono">Teléfono</h2>
                            </div>
                        </div>
                        <div id="Ingresos">
                            <div id="ingresos1">
                                <input id="tb-contraseña"
                                    onChange={handlerFormInput}
                                    value={dataForm.contraseña}
                                    type="text"
                                    name="contraseña"
                                    placeholder="Contraseña..."
                                    required></input>
                                <h2 id="h-contraseña">Contraseña</h2>
                            </div>
                            <div id="ingresos2">
                                <select value={opcionSeleccionada} onChange={manejarCambio}>
                                    <option value="">--Por favor seleccione una opción--</option>
                                    {nombres.map((item, index) => (
                                        <option key={index} value={item.nombre}>
                                            {item.nombre}
                                        </option>
                                    ))}
                                </select>
                                <h2 id="h-departamento">Departamento</h2>
                            </div>
                        </div>

                        <div id="bottom">
                            <div>
                                <button id="btn-Inf">
                                    <FontAwesomeIcon icon={faCircleXmark} style={{ color: "#dce1e5", }} />
                                </button>
                                <button id="btn-Inf" type="submit">
                                    <FontAwesomeIcon icon={faFloppyDisk} style={{ color: "#dce1e5", }} />
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
export default RegistrarEmpleado;