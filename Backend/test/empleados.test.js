const emp = require("../services/empleados");

test("Cargar empleados", async () => {
    await expect(emp.getMultiple()).resolves.toBeTruthy();
});

test("Agrega el empleado", async () => {
    var empleado = {
        cedula: "1",
        nombre: "abvc",
        fechaNac: new Date(2001, 9, 22),
        direccion: "abcv",
        telefono: "asdo",
        Dnombre: "Ventas",
    }
    await expect(emp.create(empleado)).resolves.toBeTruthy();
});

test ("Modificar Empleado", async () => {
    var empleado = {
        cedula: "1",
        nombre: "zxcvzxcv",
        fechaNac: new Date(2001, 9, 22),
        direccion: "abcv",
        telefono: "asdo",
        Dnombre: "Ventas",
    }
    await expect(emp.update("1",empleado)).resolves.toBeTruthy();
});

test("Remover empleado", async () => {
    await expect(emp.remove("1")).resolves.toBeTruthy();
});