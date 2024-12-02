import "../../design/RegistrarDepartamento.css";
import logo from "../../design/Logo.png";
import MenuSuperiorAdministrador from "../../components/MenuSuperiorAdministrador";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const RegistrarDepartamento = () => {
    const [dataForm, SetDataForm] = useState({ nombre: '', funcion: '' });

    const handlerFormInput = (e) => {
        SetDataForm({
            ...dataForm,
            [e.target.name]: e.target.value
        });
    };

    const validateDigitsNombre = (value) => {
        const minDigits = 5;
        const maxDigits = 30;
        if (value.length < minDigits || value.length > maxDigits) {
            alert(`El campo nombre debe tener entre ${minDigits} y ${maxDigits} dígitos.`);
            return false;
        }
        return true;
    };

    const validateDigitsFuncion = (value) => {
        const minDigits = 5;
        const maxDigits = 60;
        if (value.length < minDigits || value.length > maxDigits) {
            alert(`El campo funcion debe tener entre ${minDigits} y ${maxDigits} dígitos.`);
            return false;
        }
        return true;
    };

    const handlerFormSubmit = async (e) => {
        e.preventDefault();
        if (validateDigitsNombre(dataForm.nombre) && validateDigitsFuncion(dataForm.funcion)) {
            await fetch("http://localhost:3000/departamentos", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(dataForm)
            });
            alert('Registrado con exito');
        }
    };

    return (
        <div className="Fondo">
            <MenuSuperiorAdministrador />
            <div id="Panel1">
                <div id="contenedor2">
                    <div id="top">
                        <h1 id="txt-departamento">Registrar Departamento</h1>
                    </div>
                    <form onSubmit={handlerFormSubmit}>
                        <div id="Ingresos">
                            <div id="nombre">
                                <input 
                                    id="tb-nombre"
                                    onChange={handlerFormInput}
                                    value={dataForm.nombre}
                                    type="text"
                                    name="nombre"
                                    placeholder="Nombre..."
                                    required 
                                />
                                <h2 id="h-nombre">Nombre</h2>
                            </div>
                        </div>
                        <div id="Ingresos">
                            <div id="funcion">
                                <input 
                                    id="tb-funcion"
                                    onChange={handlerFormInput}
                                    value={dataForm.funcion}
                                    type="text"
                                    name="funcion"
                                    placeholder="Función..."
                                    required 
                                />
                                <h2 id="h-funcion">Función</h2>
                            </div>
                        </div>
                        <div id="bottom">
                            <div>
                                <button id="btn-Inf" type="button">
                                    <FontAwesomeIcon icon={faCircleXmark} style={{ color: "#dce1e5" }} />
                                </button>
                                <button id="btn-Inf" type="submit">
                                    <FontAwesomeIcon icon={faFloppyDisk} style={{ color: "#dce1e5" }} />
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RegistrarDepartamento;
