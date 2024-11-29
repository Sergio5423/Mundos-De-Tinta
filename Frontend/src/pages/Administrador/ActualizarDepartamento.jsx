import "../../design/RegistrarDepartamento.css"
import logo from "../../design/Logo.png";
import MenuSuperiorAdministrador from "../../components/MenuSuperiorAdministrador";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk, faCircleXmark } from "@fortawesome/free-solid-svg-icons";

const ActualizarDepartamento = () => {

    return (

        <div className="Fondo">
            <MenuSuperiorAdministrador/>
            <div id="Panel1">
                <div id="contenedor2">
                    <div id="top">
                        <h1 id="txt-departamento">Actualizar Departamento</h1>
                    </div>
                    <div id="Ingresos">
                        <div id="nombre">
                            <input id="tb-nombre"></input>
                            <h2 id="h-nombre">Nombre</h2>
                        </div>
                    </div>
                    <div id="Ingresos">
                        <div id="funcion">
                            <input id="tb-funcion"></input>
                            <h2 id="h-funcion">Función</h2>
                        </div>
                    </div>
                    <div id="bottom">
                        <div>
                            <button id="btn-Inf">
                                <FontAwesomeIcon icon={faCircleXmark} style={{ color: "#dce1e5", }} />
                            </button>
                            <button id="btn-Inf">
                                <FontAwesomeIcon icon={faFloppyDisk} style={{ color: "#dce1e5", }} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ActualizarDepartamento;