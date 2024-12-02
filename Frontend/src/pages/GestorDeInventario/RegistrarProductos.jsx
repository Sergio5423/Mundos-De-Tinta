import MenuSuperiorGestor from "../../components/MenuSuperiorGestor";
import "../../design/GestorDeInventario/RegistrarProductos.css";
import logo from "../../design/Logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";

const RegistrarProductos = () => {
  const [dataForm, SetDataForm] = useState({});
  const [opcionSeleccionada, setOpcionSeleccionada] = useState("");
  const [nombres, setNombres] = useState([]);

  const getNombres = async () => {
    const allNombres = await fetch("http://localhost:3000/categorias/nombres");
    const nombresJson = await allNombres.json();
    setNombres(nombresJson.data);
  };

  const manejarCambio = (evento) => {
    setOpcionSeleccionada(evento.target.value);
    SetDataForm({
      ...dataForm,
      Cnombre: evento.target.value,
    });
  };

  const handlerFormInput = (e) => {
    SetDataForm({
      ...dataForm,
      [e.target.name]: e.target.value,
    });
  };

  const handlerFormSubmit = async (e) => {
    e.preventDefault();
    if (
      validateCategoria(opcionSeleccionada) &&
      validateDigitsNombre(dataForm.nombre) &&
      validateDigitsPrecio(dataForm.precio_unitario) &&
      validateDigitsUnidades(dataForm.cantidad)
    ) {
      await fetch("http://localhost:3000/productos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataForm),
      });
      alert("Registrado con exito");
    }
  };

  useEffect(() => {
    getNombres();
  }, []);

  const validateCategoria = (value) => {
    if (opcionSeleccionada == "") {
      alert(`Seleccione una categoria`);
      return false;
    }
    return true;
  };

  const validateDigitsNombre = (value) => {
    const minDigits = 6;
    const maxDigits = 14;
    if (value.length < minDigits || value.length > maxDigits) {
      alert(
        `El campo nombre debe tener entre ${minDigits} y ${maxDigits} dígitos.`
      );
      return false;
    }
    return true;
  };

  const validateDigitsPrecio = (value) => {
    const minDigits = 5;
    const maxDigits = 10;
    if (value.length < minDigits || value.length > maxDigits) {
      alert(
        `El campo precio debe tener entre ${minDigits} y ${maxDigits} dígitos.`
      );
      return false;
    }
    return true;
  };

  const validateDigitsUnidades = (value) => {
    const minDigits = 1;
    const maxDigits = 4;
    if (value.length < minDigits || value.length > maxDigits) {
      alert(
        `El campo unidades debe tener entre ${minDigits} y ${maxDigits} dígitos.`
      );
      return false;
    }
    return true;
  };

  return (
    <div>
      <MenuSuperiorGestor />
      <div id="Panel1">
        <div id="contenedor4">
          <div id="top">
            <h1 id="txt1">Registrar Productos</h1>
          </div>
          <form onSubmit={handlerFormSubmit}>
            <div id="Ingresos">
              <div id="ingresos1">
                <select value={opcionSeleccionada} onChange={manejarCambio}>
                  <option value="">--Por favor seleccione una opción--</option>
                  {nombres.map((item, index) => (
                    <option key={index} value={item.nombre}>
                      {item.nombre}
                    </option>
                  ))}
                </select>
                <h2 id="h-categoria">Categoría</h2>
              </div>
              <div id="ingresos2">
                <input
                  id="tb-precioUnitario"
                  onChange={handlerFormInput}
                  value={dataForm.precio_unitario}
                  type="text"
                  name="precio_unitario"
                  placeholder="Precio..."
                  required
                ></input>
                <h2 id="h-precioUnitario">Precio Unitario</h2>
              </div>
            </div>
            <div id="Ingresos">
              <div id="ingresos1">
                <input
                  id="tb-nombre"
                  onChange={handlerFormInput}
                  value={dataForm.nombre}
                  type="text"
                  name="nombre"
                  placeholder="Nombre..."
                  required
                ></input>
                <h2 id="h-nombre">Nombre</h2>
              </div>
              <div id="ingresos2">
                <input
                  id="tb-unidades"
                  onChange={handlerFormInput}
                  value={dataForm.cantidad}
                  type="text"
                  name="cantidad"
                  placeholder="Unidades..."
                  required
                ></input>
                <h2 id="h-unidades">Unidades</h2>
              </div>
            </div>
            <div id="ingresos1">
              <input
                id="tb-fechaNac"
                onChange={handlerFormInput}
                value={dataForm.fecha_entrada}
                type="date"
                name="fecha_entrada"
                required
              ></input>
              <h2 id="h-fechaNac">Fecha de Entrada</h2>
            </div>
            <div id="bottom">
              <div>
                <button id="btn-Inf">
                  <FontAwesomeIcon
                    icon={faCircleXmark}
                    style={{ color: "#dce1e5" }}
                  />
                </button>
                <button id="btn-Inf" type="submit">
                  <FontAwesomeIcon
                    icon={faFloppyDisk}
                    style={{ color: "#dce1e5" }}
                  />
                </button>
              </div>
            </div>
          </form>
          <div id="bottom2">
            <p id="txt-PortalGestorDeInventario">PORTAL GESTOR DE INVENTARIO</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default RegistrarProductos;
