import logo from "../../design/Logo.png";
import "../../design/RegistrarEmpleado.css"
import { redireccion } from "../../components/Redireccion"
import MenuSuperiorAdministrador from "../../components/MenuSuperiorAdministrador";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faCircleXmark } from "@fortawesome/free-solid-svg-icons";

const ActualizarEmpleado = () => {

    return (
        <div>
            <MenuSuperiorAdministrador />
            <div id="Panel1">
                <div id="contenedor1">
                    <div id="top">
                        <h1 id="txt1">Actualizar Empleado</h1>
                    </div>
                    <div id="Ingresos">
                        <div id="ingresos1">
                            <input id="tb-cedula"></input>
                            <h2 id="h-cedula">Cédula</h2>
                        </div>
                        <div id="ingresos2">
                            <input id="tb-nombre"></input>
                            <h2 id="h-nombre">Nombre</h2>
                        </div>
                    </div>
                    <div id="Ingresos">
                        <div id="ingresos1">
                            <input id="tb-fechaNac"></input>
                            <h2 id="h-fechaNac">Fecha de Nacimiento</h2>
                        </div>
                        <div id="ingresos2">
                            <input id="tb-direccion"></input>
                            <h2 id="h-direccion">Dirección</h2>
                        </div>
                    </div>
                    <div id="Ingresos">
                        <div id="ingresos1">
                            <input id="tb-email"></input>
                            <h2 id="h-email">E-mail</h2>
                        </div>
                        <div id="ingresos2">
                            <input id="tb-telefono"></input>
                            <h2 id="h-telefono">Teléfono</h2>
                        </div>
                    </div>
                    <div id="Ingresos">
                        <div id="ingresos1">
                            <input id="tb-contraseña"></input>
                            <h2 id="h-contraseña">Contraseña</h2>
                        </div>
                        <div id="ingresos2">
                            <input id="tb-departamento"></input> {/*Cambiar este elemento por un combo box*/}
                            <h2 id="h-departamento">Departamento</h2>
                        </div>
                    </div>
                    <div id="bottom">
                        <div>
                            <button id="btn-Inf">
                                <FontAwesomeIcon icon={faCircleXmark} style={{ color: "#dce1e5", }} />
                            </button>
                            <button id="btn-Inf">
                                <FontAwesomeIcon icon={faPenToSquare} style={{ color: "#dce1e5", }} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ActualizarEmpleado;