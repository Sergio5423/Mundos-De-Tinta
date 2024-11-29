const express = require("express");
const cors = require('cors');
const app = express();
const port = 3000;
const departamentosRouter = require("./routes/departamentos");
const empleadosRouter = require("./routes/empleados");
const ventasRouter = require("./routes/ventas");
const productosRouter = require("./routes/productos");
const categoriasRouter = require("./routes/categorias");
const usersRouter = require("./routes/usuarios");
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cors());
app.get("/", (req, res) => {
  res.json({ message: "ok" });
});
app.use("/departamentos", departamentosRouter);
app.use("/empleados", empleadosRouter);
app.use("/ventas", ventasRouter);
app.use("/productos", productosRouter);
app.use("/categorias", categoriasRouter);
app.use("/usuarios", usersRouter);
/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
