import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import AuthProvider from "./AuthProvider";
import PrivateRoute from "./PrivateRoute";
import Administrador from "./pages/Administrador/Administrador";
import Departamentos from "./pages/Administrador/Departamentos";
import Empleados from "./pages/Administrador/Empleados";
import RegistrarEmpleado from "./pages/Administrador/RegistrarEmpleado";
import ActualizarEmpleado from "./pages/Administrador/ActualizarEmpleado";
import RegistrarDepartamento from "./pages/Administrador/RegistrarDepartamento";
import ActualizarDepartamento from "./pages/Administrador/ActualizarDepartamento";
import GestorDeInventario from "./pages/GestorDeInventario/GestorDeInventario";
import Categorias from "./pages/GestorDeInventario/Categorias";
import RegistrarCategoria from "./pages/GestorDeInventario/RegistrarCategoria";
import ActualizarCategoria from "./pages/GestorDeInventario/ActualizarCategoria";
import RegistrarProductos from "./pages/GestorDeInventario/RegistrarProductos";
import Productos from "./pages/GestorDeInventario/Productos";
import Vendedor from "./pages/Vendedor/Vendedor";
import RegistrarVenta from "./pages/Vendedor/RegistrarVenta";
import Factura from "./pages/Vendedor/Factura";
import Registros from "./pages/Vendedor/Registros";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route element={<PrivateRoute />}>
            <Route path="/administrador" element={<Administrador />} />
          </Route>
          <Route path="/administrador/departamentos" element={<Departamentos />} />
          <Route path="/administrador/empleados" element={<Empleados />} />
          <Route path="/administrador/empleados/registrarEmpleado" element={<RegistrarEmpleado />} />
          <Route path="/administrador/empleados/actualizarEmpleado" element={<ActualizarEmpleado />} />
          <Route path="/administrador/departamentos/registrarDepartamento" element={<RegistrarDepartamento />} />
          <Route path="/administrador/departamentos/actualizarDepartamento" element={<ActualizarDepartamento />} />
          <Route element={<PrivateRoute />}>
            <Route path="/gestorDeInventario" element={<GestorDeInventario />} />
          </Route>
          <Route path="/gestorDeInventario/categorias" element={<Categorias/>}/>
          <Route path="/gestorDeInventario/categorias/registrarCategoria" element={<RegistrarCategoria/>}/>
          <Route path="/gestorDeInventario/categorias/actualizarCategoria" element={<ActualizarCategoria/>}/>
          <Route path="/gestorDeInventario/productos" element={<Productos/>}/>
          <Route path="/gestorDeInventario/productos/registrarProductos" element={<RegistrarProductos/>}/>          
          <Route element={<PrivateRoute />}>
            <Route path="/vendedor" element={<Vendedor />} />
          </Route>
          
          <Route path="/vendedor/registrarVenta" element={<RegistrarVenta/>}/>
          <Route path="/vendedor/registros" element={<Registros/>}/>
        </Routes>
      </AuthProvider>
    </div>
  );
}
export default App;