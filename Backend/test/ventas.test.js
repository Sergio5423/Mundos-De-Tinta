const vnt = require("../services/ventas");

test("Cargar registros", async () => {
    await expect(vnt.getMultiple()).resolves.toBeTruthy();
});

test("Registrar Venta", async () => {
    const fechaActual = new Date();
    const año = fechaActual.getFullYear();
    const mes = fechaActual.getMonth() + 1;
    const dia = fechaActual.getDate();
    const fechaFormateada = `${año}-${mes.toString().padStart(2, "0")}-${dia
        .toString()
        .padStart(2, "0")}`;

    venta = {
        fecha: fechaFormateada,
        fk_empleados_cedula: '1235546',
        id_factura: "1",
        fk_productos_id: "1",        
    }
    await expect(vnt.create(1,venta)).resolves.toBeTruthy();
});