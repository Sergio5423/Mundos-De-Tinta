const vnt = require("../services/ventas");

test("Cargar registros", async () => {
  await expect(vnt.getMultiple()).resolves.toBeTruthy();
});

test("Registrar Venta", async (ventas) => {
  const fechaActual = new Date();
  const año = fechaActual.getFullYear();
  const mes = fechaActual.getMonth() + 1;
  const dia = fechaActual.getDate();
  const fechaFormateada = `${año}-${mes.toString().padStart(2, "0")}-${dia
    .toString()
    .padStart(2, "0")}`;

  for (const producto of ventas.productos) {
    const nuevaVenta = {
      fecha: fechaFormateada,
      fk_empleados_cedula: ventas.ced_empleado,
      ced_cliente: ventas.ced_cliente,
      fk_productos_id: producto.id,
      cantidad: producto.cantidad,
    };

    await expect(vnt.create(nuevaVenta)).resolves.toBeTruthy();

    ventasCreadas++;
  }
});
