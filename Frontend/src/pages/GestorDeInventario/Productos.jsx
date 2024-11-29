import "../../design/GestorDeInventario/Productos.css";
import MenuSuperiorGestor from "../../components/MenuSuperiorGestor";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faMagnifyingGlass, faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { redireccion } from "../../components/Redireccion";

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // Estado para el filtro de búsqueda

  const getProductos = async () => {
    const allProductos = await fetch("http://localhost:3000/productos");
    const productosJson = await allProductos.json();
    setProductos(productosJson.data);
  };

  const handlerDeleteButton = async (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este producto?")) {
      const response = await fetch(`http://localhost:3000/productos/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("Producto eliminado correctamente.");
        getProductos(); // Refrescar los productos después de eliminar
      } else {
        alert("Error al eliminar el producto.");
      }
    }
  };

  useEffect(() => {
    getProductos();
  }, []);

  // Filtrar los productos según el término de búsqueda
  const filteredProductos = productos.filter(
    (producto) =>
      producto.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      producto.categoria.toLowerCase().includes(searchTerm.toLowerCase()) ||
      producto.id.toString().includes(searchTerm)
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
      name: "Cantidad",
      selector: (row) => row.cantidad,
    },
    {
      name: "Precio Unitario",
      selector: (row) => row.precio_unitario,
    },
    {
      name: "Fecha de Entrada",
      selector: (row) => row.fecha_entrada,
    },
    {
      name: "Categoría",
      selector: (row) => row.categoria,
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
            <h1 id="txt1">Productos</h1>
            <div>
              <input
                id="tb-Buscar"
                type="text"
                placeholder="Buscar..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} // Actualiza el término de búsqueda
              />
              <button id="btn-Buscar">
                <FontAwesomeIcon icon={faMagnifyingGlass} style={{ color: "#dce1e5" }} />
              </button>
            </div>
          </div>
          <DataTable
            columns={columns}
            data={filteredProductos} // Usar datos filtrados
            pagination
            paginationPerPage={5}
          />
          <div id="bottom">
            <div>
              <button id="btn-Inf" onClick={() => redireccion("/gestorDeInventario/productos/registrarProductos")}>
                <FontAwesomeIcon icon={faFloppyDisk} style={{ color: "#dce1e5" }} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Productos;
