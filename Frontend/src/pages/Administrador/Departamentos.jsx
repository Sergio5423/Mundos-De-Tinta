import "../../design/Departamentos.css"
import logo from "../../design/Logo.png";
import { redireccion } from "../../components/Redireccion"
import MenuSuperiorAdministrador from "../../components/MenuSuperiorAdministrador";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faMagnifyingGlass, faPenToSquare, faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react"
import DataTable from "react-data-table-component";

const Departamentos = () => {

    const [departamento, setDepartamentos] = useState([])
    const [id, setId] = useState('')

    const getDepartamentos = async () => {
        const allDepartamentos = await fetch("http://localhost:3000/departamentos")
        const departamentosJson = await allDepartamentos.json()
        setDepartamentos(departamentosJson.data)
    }
    
    const handlerDeleteButton = async (id) => {        
        await fetch(`http://localhost:3000/departamentos/${id}`, {
            method: "DELETE"
        })
        getDepartamentos();
    }

    useEffect(() => {
        getDepartamentos()
    }, [])

    const columns = [
        {
            name: "Id",
            selector: row => row.id
        },
        {
            name: "Nombre",
            selector: row => row.nombre
        },
        {
            name: "Funcion",
            selector: row => row.funcion
        }
    ]

    return (
        <div className="Fondo">
            <MenuSuperiorAdministrador />
            <div id="Panel1">
                <div id="contenedor1">
                    <div id="top">
                        <h1 id="txt1">Departamentos</h1>
                        <div>
                            <input id="tb-Eliminar" type="text" value={id} onChange={(e) => setId(e.target.value)}></input>
                            <button id="btn-Inf" onClick={() => handlerDeleteButton(id)}>
                                <FontAwesomeIcon icon={faTrash} style={{ color: "#dce1e5", }} />
                            </button>
                        </div>
                    </div>
                    <div>
                        <DataTable
                            id="tabla"
                            columns={columns}
                            data={departamento}
                            pagination
                            paginationPerPage={5}
                        />
                    </div>
                    <div id="bottom">
                        <div>
                            <button id="btn-Inf" onClick={() => redireccion("/administrador/departamentos/actualizarDepartamento")}>
                                <FontAwesomeIcon icon={faPenToSquare} style={{ color: "#dce1e5", }} />
                            </button>
                            <button id="btn-Inf" onClick={() => redireccion("/administrador/departamentos/registrarDepartamento")}>
                                <FontAwesomeIcon icon={faFloppyDisk} style={{ color: "#dce1e5", }} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Departamentos;