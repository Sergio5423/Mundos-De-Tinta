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

/*async function getMultiple(page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT p.id, p.nombre, p.cantidad, p.precio_unitario, p.fecha_entrada, c.nombre
    AS categoria
    FROM productos p 
    INNER JOIN categorias c
    ON p.fk_categorias_id=c.id;`
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta,
  };
}*/

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

/*async function getById(id) {
  const row = await db.query(
    `SELECT p.id, p.nombre, p.precio_unitario, c.nombre
    AS Categoría
    FROM productos p 
    INNER JOIN categorias c
    ON p.fk_categorias_id=c.id WHERE p.id=${id};`
  );
  const data = helper.emptyOrRows(row);

  return {
    data,
  };
}*/

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

/*---------------------------------------------------------------------*/

/*async function create(producto) {
  const result = await db.query(
    `INSERT INTO productos 
    (nombre,cantidad,precio_unitario,fecha_entrada,fk_categorias_id)
    VALUES
    ("${producto.nombre}",${producto.cantidad},${producto.precio_unitario},'${producto.fecha_entrada}',(SELECT id FROM categorias WHERE nombre="${producto.Cnombre}"));`
  );

  let message = "Error al agregar el producto";

  if (result.affectedRows) {
    message = "Producto agregado";
  }

  return { message };
}*/

/*------------------------------------------------------*/
/*async function update(id, cantidad) {
  try {
    console.log(id);
    console.log(cantidad);
    // Busca el producto por id
    const producto = await models.productos.findOne({
      where: { id: id } // Usa el id directamente
    });
    console.log(producto);
    // Verifica si el producto existe
    if (!producto) {
      return { message: "Producto no encontrado" };
    }

    // Verifica si hay suficiente cantidad para actualizar
    if (producto.cantidad > 0 && producto.cantidad >= cantidad) {
      producto.cantidad -= cantidad; // Reduce la cantidad
      await producto.save(); // Guarda los cambios

      return { message: "Producto actualizado" };
    } else {
      return { message: "Cantidad insuficiente para actualizar el producto" };
    }
  } catch (error) {
    console.error("Error al actualizar el producto", error.message);
    return { message: "Error al actualizar el producto" };
  }
}*/



/*------------------------------------------------------*/

async function update(ventas) {  

  //let data = await db.query(`SELECT cantidad FROM productos WHERE id=${id}`);
  
  // Verificar si el producto existe
  /*if (data.length === 0) {
    return { message: "Producto no encontrado" };
  }*/

  //let valor = data[0].cantidad;
  
  // Verificar si hay suficiente cantidad para actualizar
  /*if (valor > 0 && valor >= cantidad) {*/
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
  /*} else {*/
    /*let message = "Cantidad insuficiente para actualizar el producto";
    return { message };*/
  /*}*/
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

/*async function remove(id) {
  const result = await db.query(`DELETE FROM productos WHERE id=${id}`);

  let message = "Error al eliminar el producto";

  if (result.affectedRows) {
    message = "Producto eliminado";
  }

  return { message };
}*/

module.exports = {
  getMultiple,
  getById,
  create,
  update,
  remove,
};
