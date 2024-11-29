var DataTypes = require("sequelize").DataTypes;
var _categorias = require("./categorias");
var _departamentos = require("./departamentos");
var _empleados = require("./empleados");
var _productos = require("./productos");
var _usuarios = require("./usuarios");
var _ventas = require("./ventas");

function initModels(sequelize) {
  var categorias = _categorias(sequelize, DataTypes);
  var departamentos = _departamentos(sequelize, DataTypes);
  var empleados = _empleados(sequelize, DataTypes);
  var productos = _productos(sequelize, DataTypes);
  var usuarios = _usuarios(sequelize, DataTypes);
  var ventas = _ventas(sequelize, DataTypes);

  productos.belongsTo(categorias, { as: "fk_categoria", foreignKey: "fk_categorias_id"});
  categorias.hasMany(productos, { as: "productos", foreignKey: "fk_categorias_id"});
  empleados.belongsTo(departamentos, { as: "fk_departamento", foreignKey: "fk_departamentos_id"});
  departamentos.hasMany(empleados, { as: "empleados", foreignKey: "fk_departamentos_id"});
  usuarios.belongsTo(empleados, { as: "fk_empleados_cedula_empleado", foreignKey: "fk_empleados_cedula"});
  empleados.hasMany(usuarios, { as: "usuarios", foreignKey: "fk_empleados_cedula"});
  ventas.belongsTo(empleados, { as: "fk_empleados_cedula_empleado", foreignKey: "fk_empleados_cedula"});
  empleados.hasMany(ventas, { as: "venta", foreignKey: "fk_empleados_cedula"});
  ventas.belongsTo(productos, { as: "fk_producto", foreignKey: "fk_productos_id"});
  productos.hasMany(ventas, { as: "venta", foreignKey: "fk_productos_id"});

  return {
    categorias,
    departamentos,
    empleados,
    productos,
    usuarios,
    ventas,    
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
