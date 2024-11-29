import { useAuth } from "../../AuthProvider";
import { Link } from "react-router-dom";
import "../../design/Vendedor/Vendedor.css";
import logo from "../../design/Logo.png";
import MenuSuperiorVendedor from "../../components/MenuSuperiorVendedor";

const Vendedor = () => {
    const auth = useAuth();
    return (
        <div id="Fondo2">
            <MenuSuperiorVendedor/>
            <div id="bottom2">
                <h1 id="txt-OrganizaTusVentas">Organiza tus ventas</h1>
                <p id="txt-Portal">PORTAL VENDEDOR</p>
            </div>
        </div>
    );
};
export default Vendedor;