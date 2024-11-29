import MenuSuperiorAdministrador from "../../components/MenuSuperiorAdministrador";
import logo from "../../design/Logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faMagnifyingGlass, faPenToSquare, faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react"
import DataTable from "react-data-table-component";
import { redireccion } from "../../components/Redireccion"

const Empleados = () => {
    const [empleados, setEmpleados] = useState([])
    const [id, setId] = useState('')

    const getEmpleados = async () => {
        const allEmpleados = await fetch("http://localhost:3000/empleados")
        const empleadosJson = await allEmpleados.json()
        setEmpleados(empleadosJson.data)
    }

    const handlerDeleteButton = async (id) => {        
        await fetch(`http://localhost:3000/empleados/${id}`, {
            method: "DELETE"
        })
        getEmpleados();
    }

    useEffect(() => {
        getEmpleados()
    }, [])

    const columns = [
        {
            name: "Cedula",
            selector: row => row.cedula
        },
        {
            name: "Nombre",
            selector: row => row.nombre
        },
        {
            name: "fechaNac",
            selector: row => row.fechaNac
        },
        {
            name: "Direccion",
            selector: row => row.direccion
        },
        {
            name: "Telefono",
            selector: row => row.telefono
        },
        {
            name: "Departamento",
            selector: row => row.Departamento
        }
    ]

    return (
        <div className="Fondo">
            <MenuSuperiorAdministrador />
            <div id="Panel1">
                <div id="contenedor1">
                    <div id="top">
                        <h1 id="txt1">Empleados</h1>
                        <div>
                            <input id="tb-Buscar" type="text" value={id} onChange={(e) => setId(e.target.value)}></input>
                            <button id="btn-Buscar">
                                <FontAwesomeIcon icon={faMagnifyingGlass} style={{ color: "#dce1e5", }} />
                            </button>
                            <button id="btn-Inf" onClick={() => handlerDeleteButton(id)}>
                                <FontAwesomeIcon icon={faTrash} style={{ color: "#dce1e5", }} />
                            </button>
                            <button id="btn-Inf" onClick={() => redireccion("/administrador/empleados/actualizarEmpleado")}>
                                <FontAwesomeIcon icon={faPenToSquare} style={{ color: "#dce1e5", }} />
                            </button>
                        </div>
                    </div>
                    <div>
                        <DataTable
                            id="tabla"
                            columns={columns}
                            data={empleados}
                            pagination
                            paginationPerPage={5}
                        />
                    </div>
                    <div id="bottom">
                        <div>
                            <button id="btn-Inf" onClick={() => redireccion("/administrador/empleados/registrarEmpleado")}>
                                <FontAwesomeIcon icon={faFloppyDisk} style={{ color: "#dce1e5", }} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Empleados;