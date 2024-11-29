import MenuSuperiorVendedor from "../../components/MenuSuperiorVendedor";
import logo from "../../design/Logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";

const Registros = () => {
  const [ventas, setVentas] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // Estado para búsqueda

  const getVentas = async () => {
    const allVentas = await fetch("http://localhost:3000/ventas");
    const ventasJson = await allVentas.json();
    setVentas(ventasJson.data);
  };

  const eliminarVenta = async (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar esta venta?")) {
      const response = await fetch(`http://localhost:3000/ventas/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("Venta eliminada correctamente");
        getVentas(); // Refrescar los datos después de eliminar
      } else {
        alert("Hubo un error al eliminar la venta");
      }
    }
  };

  useEffect(() => {
    getVentas();
  }, []);

  // Filtrar las ventas según el término de búsqueda
  const filteredVentas = ventas.filter(
    (venta) =>
      venta.nombreEmpleado.toLowerCase().includes(searchTerm.toLowerCase()) ||
      venta.nombreProducto.toLowerCase().includes(searchTerm.toLowerCase()) ||
      venta.cedula.toString().includes(searchTerm) ||
      venta.fecha.includes(searchTerm)
  );

  const columns = [
    {
      name: "Id",
      selector: (row) => row.id,
    },
    {
      name: "Fecha",
      selector: (row) => row.fecha,
    },
    {
      name: "Cédula Empleado",
      selector: (row) => row.cedula,
    },
    {
      name: "Nombre Empleado",
      selector: (row) => row.nombreEmpleado,
    },
    {
      name: "Nombre Producto",
      selector: (row) => row.nombreProducto,
    },
    {
      name: "Precio Unitario",
      selector: (row) => row.precio_unitario,
    },
    {
      name: "Cantidad",
      selector: (row) => row.cantidad,
    },
    {
      name: "Acciones",
      cell: (row) => (
        <button
          onClick={() => eliminarVenta(row.id)}
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
      <MenuSuperiorVendedor />
      <div id="Panel1">
        <div id="contenedor1">
          <div id="top">
            <h1 id="txt1">Ventas</h1>
            <div>
              <input
                id="tb-Buscar"
                type="text"
                placeholder="Buscar..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} // Actualiza el término de búsqueda
              />
              <button id="btn-Buscar">
                <FontAwesomeIcon
                  icon={faMagnifyingGlass}
                  style={{ color: "#dce1e5" }}
                />
              </button>
            </div>
          </div>
          <div>
            <DataTable
              columns={columns}
              data={filteredVentas} // Usar datos filtrados
              pagination
              paginationPerPage={5}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registros;
