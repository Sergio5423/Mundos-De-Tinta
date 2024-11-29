const db = require("./db");
const helper = require("../helper");
const config = require("../config");
const sequelize = require("../config-db");
const initModels = require("../models/init-models");
const models = initModels(sequelize);

/*------------------------------------------------------------------------*/
async function getMultiple(page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);

  const rows = await models.departamentos.findAll({
    attributes: ["id", "nombre", "funcion"],
    offset: offset,
    limit: config.listPerPage,
  });

  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta,
  };
}

/*------------------------------------------------------------------------*/

/*async function getMultiple(page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT id,nombre,funcion 
    FROM departamentos`
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta,
  };
}*/

/*------------------------------------------------------------------*/
async function getNombres(page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);

  const rows = await models.departamentos.findAll({
    attributes: ["nombre"],
    offset: offset,
    limit: config.listPerPage,
  });

  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta,
  };
}

/*------------------------------------------------------------------*/

/*async function getNombres(page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT nombre
    FROM departamentos`
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta,
  };
}*/
/*------------------------------------------------------------*/
async function create(departamento) {
  const result = await models.departamentos.create({
    nombre: departamento.nombre,
    funcion: departamento.funcion,
  });

  let message = "Error al agregar el departamento";

  if (result.affectedRows) {
    message = "Departamento agregado";
  }

  return { message };
}
/*------------------------------------------------------------*/
/*async function create(departamento) {
  const result = await db.query(
    `INSERT INTO departamentos 
    (nombre,funcion) 
    VALUES 
    ('${departamento.nombre}', '${departamento.funcion}')`
  );

  let message = "Error al agregar el departamento";

  if (result.affectedRows) {
    message = "Departamento agregado";
  }

  return { message };
}*/

/*----------------------------------------------------------*/
async function update(id, departamento) {
  const result = await models.departamentos.update(
    {
      nombre: departamento.nombre,
      funcion: departamento.funcion,
    },
    {
      where: {
        id: id,
      },
    }
  );

  if (result[0]) {
    message = "Departamento actualizado";
  }

  return { message };
}
/*----------------------------------------------------------*/

/*async function update(id, departamento) {
  const result = await db.query(
    `UPDATE departamentos 
    SET nombre='${departamento.nombre}', funcion='${departamento.funcion}'
    WHERE id=${id}`
  );

  let message = "Error al actualizar el departamento";

  if (result.affectedRows) {
    message = "Departamento actualizado";
  }

  return { message };
}*/

async function remove(id) {
  const result = await models.departamentos.destroy({
    where: {
      id: id,
    },
  });

  if (result) {
    message = "Departamento eliminado";
  }

  return { message };
}

module.exports = {
  getMultiple,
  getNombres,
  create,
  update,
  remove,
};
