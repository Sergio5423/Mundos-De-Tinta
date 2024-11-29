import MenuSuperiorVendedor from "../../components/MenuSuperiorVendedor";
import logo from "../../design/Logo.png";
import "../../design/Vendedor/RegistrarVenta.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faMagnifyingGlass,
  faCashRegister,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";

const RegistrarVenta = () => {
  const [productos, setProductos] = useState([]);
  const [id, setId] = useState("");
  const [dataForm, setDataForm] = useState({});
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedQuantities, setSelectedQuantities] = useState({});
  const [searchTerm, setSearchTerm] = useState(""); // Nuevo estado para búsqueda

  const getProductos = async () => {
    const allProductos = await fetch("http://localhost:3000/productos");
    const productosJson = await allProductos.json();
    setProductos(productosJson.data);
  };

  const handlerBuy = async (e) => {
    e.preventDefault();
    const { cedulaEmpleado, cedulaCliente } = dataForm;
    const selectedProducts = selectedRows.map((row) => ({
      id: row.id,
      cantidad: selectedQuantities[row.id] || 1,
    }));

    if (!cedulaEmpleado || !cedulaCliente || selectedProducts.length === 0) {
      alert(
        "Por favor, completa todos los campos y selecciona al menos un producto."
      );
      return;
    }

    const payload = {
      ced_empleado: cedulaEmpleado,
      ced_cliente: cedulaCliente,
      productos: selectedProducts,
      facturaId: dataForm.facturaId,
    };

    if (window.confirm("¿Estás seguro de que deseas registrar esta venta?")) {
      const response = await fetch(`http://localhost:3000/ventas/nuevaVenta`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const updateResponse = await fetch(
        `http://localhost:3000/productos/actualizar`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      getProductos();
      if (response.ok && updateResponse.ok) {
        alert("¡Venta registrada exitosamente!");
      } else {
        const result = await response.json();
        alert(`Error al registrar la venta: ${result.message}`);
      }
    }
  };

  const handlerFormInput = (e) => {
    setDataForm({
      ...dataForm,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    let numeroAleatorio = Math.floor(Math.random() * 9000000000) + 1000000000;
    numeroAleatorio = numeroAleatorio.toString();
    setDataForm((prevDataForm) => ({
      ...prevDataForm,
      facturaId: numeroAleatorio,
    }));
    getProductos();
  }, []);

  const handleRowSelected = (state) => {
    setSelectedRows(state.selectedRows);
  };

  const handleQuantityChange = (id, value) => {
    setSelectedQuantities({
      ...selectedQuantities,
      [id]: value,
    });
  };

  // Filtrar productos según el término de búsqueda
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
      cell: (row) => (
        <input
          id="selector"
          type="number"
          min="1"
          value={selectedQuantities[row.id] || 1}
          onChange={(e) => handleQuantityChange(row.id, e.target.value)}
        />
      ),
    },
    {
      name: "Disponible",
      selector: (row) => row.cantidad,
    },
    {
      name: "Precio Unitario",
      selector: (row) => row.precio_unitario,
    },
    {
      name: "Categoría",
      selector: (row) => row.categoria,
    },
  ];

  return (
    <div className="Fondo">
      <MenuSuperiorVendedor />
      <div id="Panel1">
        <div id="contenedor1">
          <form onSubmit={handlerBuy} id="formTabla">
            <div id="top">
              <h1 id="txt1">Registrar venta</h1>
              <div>
                <input
                  id="tb-Buscar"
                  type="text"
                  value={dataForm.cedulaEmpleado || ""}
                  onChange={handlerFormInput}
                  name="cedulaEmpleado"
                  placeholder="Cédula Empleado"
                />
                <input
                  id="tb-Buscar"
                  type="text"
                  value={dataForm.cedulaCliente || ""}
                  onChange={handlerFormInput}
                  name="cedulaCliente"
                  placeholder="Cédula Cliente"
                />
                <input
                  id="tb-BuscarVentas"
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Buscar productos..."
                />        
              </div>
            </div>

            <DataTable
              id="tabla"
              className="custom-table"
              columns={columns}
              data={filteredProductos} // Se usa el arreglo filtrado
              pagination
              paginationPerPage={10}
              selectableRows
              onSelectedRowsChange={handleRowSelected}
            />
          </form>
          <div id="bottom">
            <button id="btn-Inf" onClick={handlerBuy}>
              <FontAwesomeIcon
                icon={faCashRegister}
                style={{ color: "#dce1e5" }}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrarVenta;
