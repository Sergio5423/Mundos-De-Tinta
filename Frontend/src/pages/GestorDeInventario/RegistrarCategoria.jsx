import MenuSuperiorGestor from "../../components/MenuSuperiorGestor";
import "../../design/GestorDeInventario/RegistrarCategoria.css"
import logo from "../../design/Logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const RegistrarCategoria = () => {

    const [dataForm, SetDataForm] = useState({})

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
        await fetch("http://localhost:3000/categorias", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dataForm)
        })
    }

    return (
        <div id="Fondo3">
            <MenuSuperiorGestor />
            <div id="contenedor3">
                <div id="top">
                    <h1 id="txt-categoria">Registrar Categoría</h1>
                </div>
                <form onSubmit={handlerFormSubmit}>
                    <div id="Ingresos">
                        <div id="nombre">
                            <input id="tb-tipoCat" onChange={handlerFormInput} value={dataForm.tipo} type="text" name="tipo" placeholder="Tipo..." required></input>
                            <h2 id="h-tipo">Tipo</h2>
                        </div>
                    </div>
                    <div id="Ingresos">
                        <div id="funcion">
                            <input id="tb-nombreCat" onChange={handlerFormInput} value={dataForm.name} type="text" name="nombre" placeholder="Nombre..." required></input>
                            <h2 id="h-nombre">Nombre</h2>
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
            <div id="bottom2">
                <p id="txt-PortalGestorDeInventario">PORTAL GESTOR DE INVENTARIO</p>
            </div>
        </div>
    );
};
export default RegistrarCategoria;