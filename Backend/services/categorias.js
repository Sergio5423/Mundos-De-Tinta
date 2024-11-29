const db = require('./db');
const helper = require('../helper');
const config = require('../config');
const sequelize = require("../config-db");
const initModels = require("../models/init-models");
const models = initModels(sequelize);

/*---------------------------------------------------------------*/
async function getMultiple(page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  
  const data = await models.categorias.findAll({
    attributes: ['id', 'nombre', 'tipo'],
    offset: offset,
    limit: config.listPerPage
  });

  const meta = { page };

  return {
    data,
    meta,
  };
}

/*---------------------------------------------------------------*/

/*async function getMultiple(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT id,nombre,tipo     
    FROM categorias;`
  );
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
    data,
    meta
  }
}*/

/*------------------------------------------------------------*/
async function getNombres(page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  
  const data = await models.categorias.findAll({
    attributes: ['nombre'],
    offset: offset,
    limit: config.listPerPage
  });

  const meta = { page };

  return {
    data,
    meta,
  };
}
/*------------------------------------------------------------*/

/*async function getNombres(page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT nombre
    FROM categorias`
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta,
  };
}*/

/*------------------------------------------------*/
async function create(categoria) {
  let message = "Error al agregar la categoria";
  
  const result = await models.categorias.create({
    nombre: categoria.nombre,
    tipo: categoria.tipo
  });
  
  if (result) {
    message = "Categoria agregada";
  }

  return { message };
}

/*------------------------------------------------*/

/*async function create(categoria){
  const result = await db.query(
    `INSERT INTO categorias 
    (nombre,tipo)
    VALUES
    ("${categoria.nombre}","${categoria.tipo}");`
  );

  let message = 'Error al agregar la categoria';

  if (result.affectedRows) {
    message = 'Categoria agregada';
  }

  return {message};
}*/

/*--------------------------------------------------------------*/
async function update(id, categoria) {
  let message = "Error al actualizar la categoria";
  
  // Reemplaza la consulta SQL con Sequelize
  const result = await models.categorias.update({
    nombre: categoria.nombre,
    tipo: categoria.tipo
  }, {
    where: {
      id: id
    }
  });
  
  if (result[0]) {
    message = "Categoria actualizada";
  }

  return { message };
}
/*--------------------------------------------------------------*/

/*async function update(id, categoria){
  const result = await db.query(
    `UPDATE categorias 
    SET nombre="${categoria.nombre}", tipo="${categoria.tipo}"
    WHERE id=${id};` 
  );

  let message = 'Error al actualizar la categoria';

  if (result.affectedRows) {
    message = 'Categoria actualizada';
  }

  return {message};
}*/

/*----------------------------------------------------*/
async function remove(id) {
  let message = "Error al eliminar la categoria";
  
  const result = await models.categorias.destroy({
    where: {
      id: id
    }
  });
  
  if (result) { 
    message = "Categoria eliminada";
  }

  return { message };
}

/*----------------------------------------------------*/

/*async function remove(id){
  const result = await db.query(
    `DELETE FROM categorias WHERE id=${id}`
  );

  let message = 'Error al eliminar la categoria';

  if (result.affectedRows) {
    message = 'Categoria eliminada';
  }

  return {message};
}*/

module.exports = {
  getMultiple,
  getNombres,
  create, update, remove,
}