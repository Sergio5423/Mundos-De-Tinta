const prd = require("../services/productos");

test("Cargar productos", async () => {
    await expect(prd.getMultiple()).resolves.toBeTruthy();
});

test("Registrar Producto", async () => {
    producto = {
        nombre: "Telefono",
        cantidad: 10,
        precio_unitario: 70,
        fecha_entrada: new Date(2001, 9, 22),
        Cnombre: "Computador"
    }
    await expect(prd.create(producto)).resolves.toBeTruthy();
});

test ("Modificar Cargamento", async () => {
    await expect(prd.update("1")).resolves.toBeTruthy();
});

test ("Eliminar Cargamento", async () => {
    await expect(prd.remove("2")).resolves.toBeTruthy();
});