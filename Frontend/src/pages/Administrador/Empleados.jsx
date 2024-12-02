import React, { useState, useEffect } from "react";
import MenuSuperiorAdministrador from "../../components/MenuSuperiorAdministrador";
import logo from "../../design/Logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faMagnifyingGlass, faPenToSquare, faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import DataTable from "react-data-table-component";
import { redireccion } from "../../components/Redireccion";

const Empleados = () => {
    const [empleados, setEmpleados] = useState([]);
    const [search, setSearch] = useState("");
    const [filteredEmpleados, setFilteredEmpleados] = useState([]);

    const getEmpleados = async () => {
        const allEmpleados = await fetch("http://localhost:3000/empleados");
        const empleadosJson = await allEmpleados.json();
        setEmpleados(empleadosJson.data);
        setFilteredEmpleados(empleadosJson.data);
    };

    const handlerDeleteButton = async (id) => {
        const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este empleado?");
        if (confirmDelete) {
            await fetch(`http://localhost:3000/empleados/${id}`, {
                method: "DELETE"
            });
            getEmpleados();
        }
    };

    useEffect(() => {
        getEmpleados();
    }, []);

    useEffect(() => {
        const result = empleados.filter(empleado => {
            return empleado.nombre.toLowerCase().includes(search.toLowerCase()) ||
                   empleado.cedula.toString().includes(search);
        });
        setFilteredEmpleados(result);
    }, [search, empleados]);

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
            name: "Fecha de Nacimiento",
            selector: row => row.fechaNac
        },
        {
            name: "Dirección",
            selector: row => row.direccion
        },
        {
            name: "Teléfono",
            selector: row => row.telefono
        },
        {
            name: "Departamento",
            selector: row => row.Departamento
        },
        {
            name: "Acciones",
            cell: row => (
                <>
                    <button id="btn-Eliminar" onClick={() => handlerDeleteButton(row.cedula)}>
                        <FontAwesomeIcon icon={faTrash} style={{ color: "FF0000" }} />
                    </button>
                    {/*<button id="btn-Editar" onClick={() => redireccion(`/administrador/empleados/${row.id}`)} style={{ marginLeft: "10px" }}>
                        <FontAwesomeIcon icon={faPenToSquare} style={{ color: "#dce1e5" }} />
                    </button>*/}
                </>
            )
        }
    ];

    return (
        <div className="Fondo">
            <MenuSuperiorAdministrador />
            <div id="Panel1">
                <div id="contenedor1">
                    <div id="top">
                        <h1 id="txt1">Empleados</h1>
                        <div>
                            <input 
                                id="tb-Buscar" 
                                type="text" 
                                value={search} 
                                onChange={(e) => setSearch(e.target.value)} 
                                placeholder="Buscar por nombre o cédula..."
                            />
                            <button id="btn-Buscar">
                                <FontAwesomeIcon icon={faMagnifyingGlass} style={{ color: "#dce1e5" }} />
                            </button>
                        </div>
                    </div>
                    <div>
                        <DataTable
                            id="tabla"
                            columns={columns}
                            data={filteredEmpleados}
                            pagination
                            paginationPerPage={5}
                        />
                    </div>
                    <div id="bottom">
                        <div>
                            <button id="btn-Inf" onClick={() => redireccion("/administrador/empleados/registrarEmpleado")}>
                                <FontAwesomeIcon icon={faFloppyDisk} style={{ color: "#dce1e5" }} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Empleados;
