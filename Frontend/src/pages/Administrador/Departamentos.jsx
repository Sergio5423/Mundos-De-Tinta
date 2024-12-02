import "../../design/Departamentos.css";
import logo from "../../design/Logo.png";
import { redireccion } from "../../components/Redireccion";
import MenuSuperiorAdministrador from "../../components/MenuSuperiorAdministrador";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faMagnifyingGlass, faPenToSquare, faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";

const Departamentos = () => {
    const [departamento, setDepartamentos] = useState([]);
    const [search, setSearch] = useState("");
    const [filteredDepartamentos, setFilteredDepartamentos] = useState([]);

    const getDepartamentos = async () => {
        const allDepartamentos = await fetch("http://localhost:3000/departamentos");
        const departamentosJson = await allDepartamentos.json();
        setDepartamentos(departamentosJson.data);
        setFilteredDepartamentos(departamentosJson.data);
    };
    
    const handlerDeleteButton = async (id) => {
        const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este departamento?");
        if (confirmDelete) {
            await fetch(`http://localhost:3000/departamentos/${id}`, {
                method: "DELETE"
            });
            getDepartamentos();
        }
    };

    const handleSearch = (e) => {
        setSearch(e.target.value);
        const filteredData = departamento.filter(dept =>
            dept.nombre.toLowerCase().includes(e.target.value.toLowerCase()) ||
            dept.funcion.toLowerCase().includes(e.target.value.toLowerCase())
        );
        setFilteredDepartamentos(filteredData);
    };

    useEffect(() => {
        getDepartamentos();
    }, []);

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
            name: "Función",
            selector: row => row.funcion
        },
        {
            name: "Acciones",
            cell: row => (
                <button id="btn-Eliminar" onClick={() => handlerDeleteButton(row.id)}>
                    <FontAwesomeIcon icon={faTrash} style={{ color: "FF0000" }} />
                </button>
            )
        }
    ];

    return (
        <div className="Fondo">
            <MenuSuperiorAdministrador />
            <div id="Panel1">
                <div id="contenedor1">
                    <div id="top">
                        <h1 id="txt1">Departamentos</h1>
                        <input
                            type="text"
                            placeholder="Buscar por nombre o función"
                            value={search}
                            onChange={handleSearch}
                            style={{ marginBottom: '20px', padding: '10px', width: '300px' }}
                        />
                    </div>
                    <div>
                        <DataTable
                            id="tabla"
                            columns={columns}
                            data={filteredDepartamentos}
                            pagination
                            paginationPerPage={5}
                        />
                    </div>
                    <div id="bottom">
                        <div>
                            <button id="btn-Inf" onClick={() => redireccion("/administrador/departamentos/registrarDepartamento")}>
                                <FontAwesomeIcon icon={faFloppyDisk} style={{ color: "#dce1e5" }} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Departamentos;
