import MenuSuperiorVendedor from "../../components/MenuSuperiorVendedor";
import logo from "../../design/Logo.png";
import "../../design/Vendedor/Factura.css"

const Factura = () => {
    return (
        <div className="Fondo">
            <MenuSuperiorVendedor/>            
            <div id="Panel1">
                <div id="factura">
                    <div>
                        <h1 id="txt-factura">Factura</h1>
                    </div>
                    <div id="cuerpoRecibo">
                        <div>
                            <h2>Número de recibo</h2> {/*Reemplazar aquí*/}
                        </div>
                        <div id="titulos">
                            <h2>Identificador</h2> 
                            <h2>Nombre</h2>
                            <h2>Valor</h2>
                        </div>
                        <div id="productos">
                            <h3>-</h3> {/*Reemplazar aquí*/}
                            <h3>-</h3> {/*Reemplazar aquí*/}
                            <h3>-</h3> {/*Reemplazar aquí*/}
                        </div>
                        <div id="total">
                            <h2 id="txt-Total">Total</h2>
                            <h2>.</h2> {/*Reemplazar aquí*/}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Factura;