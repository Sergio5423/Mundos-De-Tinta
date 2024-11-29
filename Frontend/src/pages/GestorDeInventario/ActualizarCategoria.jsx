import MenuSuperiorGestor from "../../components/MenuSuperiorGestor";
import "../../design/GestorDeInventario/RegistrarCategoria.css"
import logo from "../../design/Logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk, faCircleXmark } from "@fortawesome/free-solid-svg-icons";

const ActualizarCategoria = () => {
    return (
        <div id="Fondo3">
            <MenuSuperiorGestor />
            <div id="contenedor3">
                <div id="top">
                    <h1 id="txt-categoria">Actualizar Categoría</h1>
                </div>
                <div id="Ingresos">
                    <div id="nombre">
                        <input id="tb-tipoCat"></input>
                        <h2 id="h-tipo">Tipo</h2>
                    </div>
                </div>
                <div id="Ingresos">
                    <div id="funcion">
                        <input id="tb-nombreCat"></input>
                        <h2 id="h-nombre">Nombre</h2>
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
            <div id="bottom2">
                <p id="txt-PortalGestorDeInventario">PORTAL GESTOR DE INVENTARIO</p>
            </div>
        </div>
    );
};
export default ActualizarCategoria;