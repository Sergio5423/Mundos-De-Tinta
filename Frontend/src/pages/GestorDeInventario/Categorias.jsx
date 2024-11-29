import "../../design/GestorDeInventario/Productos.css";
import MenuSuperiorGestor from "../../components/MenuSuperiorGestor";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faMagnifyingGlass, faPenToSquare, faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { redireccion } from "../../components/Redireccion";

const Productos = () => {
  const [categorias, setCategorias] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // Estado para el filtro de búsqueda

  const getCategorias = async () => {
    const allCategorias = await fetch("http://localhost:3000/categorias");
    const categoriasJson = await allCategorias.json();
    setCategorias(categoriasJson.data);
  };

  const handlerDeleteButton = async (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar esta categoría?")) {
      const response = await fetch(`http://localhost:3000/categorias/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("Categoría eliminada correctamente.");
        getCategorias(); // Refrescar los datos
      } else {
        alert("Error al eliminar la categoría.");
      }
    }
  };

  useEffect(() => {
    getCategorias();
  }, []);

  // Filtrar las categorías según el término de búsqueda
  const filteredCategorias = categorias.filter(
    (categoria) =>
      categoria.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      categoria.tipo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      categoria.id.toString().includes(searchTerm)
  );

  const columns = [
    {
      name: "Id",
      selector: (row) => row.id,
    },
    {
      name: "Nombre",
      selector: (row) => row.nombre,
    },
    {
      name: "Tipo",
      selector: (row) => row.tipo,
    },
    {
      name: "Acciones",
      cell: (row) => (
        <button
          onClick={() => handlerDeleteButton(row.id)}
          style={{
            backgroundColor: "transparent",
            border: "none",
            cursor: "pointer",
          }}
        >
          <FontAwesomeIcon icon={faTrash} style={{ color: "red" }} />
        </button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  return (
    <div className="Fondo">
      <MenuSuperiorGestor />
      <div id="Panel1">
        <div id="contenedor1">
          <div id="top">
            <h1 id="txt1">Categorías</h1>
            <div>
              <input
                id="tb"
                type="text"
                placeholder="Buscar..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} // Actualiza el término de búsqueda
              />
              <button id="btn-Inf">
                <FontAwesomeIcon icon={faMagnifyingGlass} style={{ color: "#dce1e5" }} />
              </button>
            </div>
          </div>
          <DataTable
            columns={columns}
            data={filteredCategorias} // Usar datos filtrados
            pagination
            paginationPerPage={5}
          />
          <div id="bottom">
            <div>
              <button id="btn-Inf" onClick={() => redireccion("/gestorDeInventario/categorias/registrarCategoria")}>
                <FontAwesomeIcon icon={faFloppyDisk} style={{ color: "#dce1e5" }} />
              </button>
              <button id="btn-Inf" onClick={() => redireccion("/gestorDeInventario/categorias/actualizarCategoria")}>
                <FontAwesomeIcon icon={faPenToSquare} style={{ color: "#dce1e5" }} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Productos;
