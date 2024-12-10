const db = require("./db");
const helper = require("../helper");
const config = require("../config");
const sequelize = require("../config-db");
const initModels = require("../models/init-models");
const models = initModels(sequelize);

/*---------------------------------------------------------------------*/
async function getMultiple(page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  
  const data = await models.productos.findAll({
    attributes: ['id', 'nombre', 'cantidad', 'precio_unitario', 'fecha_entrada', [sequelize.col('fk_categoria.nombre'), 'categoria']],
    include: [{
      model: models.categorias,
      as: 'fk_categoria',
      attributes: [],
      required: true
    }],
    offset: offset,
    limit: config.listPerPage
  });

  const meta = { page };

  return {
    data,
    meta,
  };
}

/*---------------------------------------------------------------------*/

/*-------------------------------------------------------------*/
async function getById(id) {
  const producto = await models.productos.findOne({
    where: { id: id },
    include: [{
      model: models.categorias,
      as: 'fk_categoria',
      attributes: ['nombre']
    }],
    attributes: ['id', 'nombre', 'precio_unitario']
  });

  if (!producto) {
    return { data: [] };
  }

  const data = producto.toJSON();

  data['Categoría'] = data.fk_categoria.nombre;
  delete data.fk_categoria; 

  return { data };
}

/*-------------------------------------------------------------*/
/*---------------------------------------------------------------------*/
async function create(producto) {
  const categoria = await models.categorias.findOne({
    where: { nombre: producto.Cnombre }
  });

  if (!categoria) {
    return { message: "Categoría no encontrada" };
  }

  const nuevoProducto = {
    nombre: producto.nombre,
    cantidad: producto.cantidad,
    precio_unitario: producto.precio_unitario,
    fecha_entrada: producto.fecha_entrada,
    fk_categorias_id: categoria.id
  };

  const result = await models.productos.create(nuevoProducto);

  let message = "Error al agregar el producto";

  if (result) {
    message = "Producto agregado";
  }

  return { message };
}



/*------------------------------------------------------*/

async function update(ventas) {  

  for (const producto of ventas.productos) {
    const nuevaAct = {
      id: producto.id,
      cantidad: producto.cantidad
    };
    console.log(nuevaAct.id);
    console.log(nuevaAct.cantidad);
    const result = await db.query(
      `UPDATE productos 
       SET cantidad=cantidad-${nuevaAct.cantidad}
       WHERE id=${nuevaAct.id};`
    );
  }
    

    let message = "Producto actualizado";
    return { message };

}


/*-------------------------------------------------------------------*/
async function remove(id) {

  const producto = await models.productos.findOne({
    where: { id: id }
  });

  if (!producto) {
    return { message: "Producto no encontrado" };
  }

  await producto.destroy();

  return { message: "Producto eliminado" };
}
/*-------------------------------------------------------------------*/


module.exports = {
  getMultiple,
  getById,
  create,
  update,
  remove,
};
