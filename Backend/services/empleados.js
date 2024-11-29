const db = require("./db");
const helper = require("../helper");
const config = require("../config");
const sequelize = require("../config-db");
const initModels = require("../models/init-models");
const models = initModels(sequelize);

/*----------------------------------------------------------------------*/
async function getMultiple(page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const data = await models.empleados.findAll({
    attributes: [
      "cedula",
      "nombre",
      "fechaNac",
      "direccion",
      "telefono",
      [sequelize.col("fk_departamento.nombre"), "Departamento"],
    ],
    include: [
      {
        model: models.departamentos,
        as: "fk_departamento",
        attributes: [],
        required: true,
      },
    ],
    offset: offset,
    limit: config.listPerPage,
  });
  const meta = { page };
  return {
    data,
    meta,
  };
}
/*----------------------------------------------------------------------*/

/*async function getMultiple(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT e.cedula, e.nombre, e.fechaNac, e.direccion, e.telefono, d.nombre 
    AS Departamento
    FROM empleados e 
    INNER JOIN departamentos d
    ON e.fk_departamentos_id = d.id;`
  );
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
    data,
    meta
  }
}*/

/*----------------------------------------------------------------------*/
async function create(empleado) {
  let message = "Error al agregar el empleado";

  const departamento = await models.departamentos.findOne({
    where: {
      nombre: empleado.Dnombre,
    },
  });

  if (departamento) {
    const result = await models.empleados.create({
      cedula: empleado.cedula,
      nombre: empleado.nombre,
      fechaNac: empleado.fechaNac,
      direccion: empleado.direccion,
      telefono: empleado.telefono,
      fk_departamentos_id: departamento.id,
    });

    if (result) {
      message = "Empleado agregado";
    }
  }

  return { message };
}
/*----------------------------------------------------------------------*/

/*async function create(empleado) {
  const result = await db.query(
    `INSERT INTO empleados 
    (cedula,nombre,fechaNac,direccion,telefono,fk_departamentos_id)
    VALUES
    ("${empleado.cedula}","${empleado.nombre}",'${empleado.fechaNac}',"${empleado.direccion}","${empleado.telefono}",(SELECT id FROM departamentos WHERE nombre="${empleado.Dnombre}"));`
  );

  let message = "Error al agregar el empleado";

  if (result.affectedRows) {
    message = "Empleado agregado";
  }

  return { message };
}*/

/*-----------------------------------------------------------------------*/
async function update(cedula, empleado) {
  let message = "Error al actualizar el empleado";
  
  const result = await models.empleados.update({
    cedula: empleado.cedula,
    nombre: empleado.nombre,
    fechaNac: empleado.fechaNac,
    direccion: empleado.direccion,
    telefono: empleado.telefono,
    fk_departamentos_id: empleado.fk_departamentos_id
  }, {
    where: {
      cedula: cedula
    }
  });
  
  if (result[0]) {  // result es un array donde el primer elemento es el número de filas afectadas
    message = "Empleado actualizado";
  }

  return { message };
}

/*-----------------------------------------------------------------------*/

/*async function update(cedula, empleado) {
  const result = await db.query(
    `UPDATE empleados 
    SET cedula="${empleado.cedula}", nombre="${empleado.nombre}", fechaNac='${empleado.fechaNac}', direccion="${empleado.direccion}", telefono ="${empleado.telefono}", fk_departamentos_id=${empleado.fk_departamentos_id}
    WHERE cedula="${cedula}";`
  );

  let message = "Error al actualizar el empleado";

  if (result.affectedRows) {
    message = "Empleado actualizado";
  }

  return { message };
}*/

/*-----------------------------------------------------*/
async function remove(cedula) {
  let message = "Error al eliminar al empleado";
  
  const result = await models.empleados.destroy({
    where: {
      cedula: cedula
    }
  });
  
  if (result) { 
    message = "Empleado eliminado";
  }

  return { message };
}

/*-----------------------------------------------------*/

/*async function remove(cedula) {
  const result = await db.query(
    `DELETE FROM empleados WHERE cedula="${cedula}"`
  );

  let message = "Error al eliminar al empleado";

  if (result.affectedRows) {
    message = "Empleado eliminado";
  }

  return { message };
}*/

module.exports = {
  getMultiple,
  create,
  update,
  remove,
};
