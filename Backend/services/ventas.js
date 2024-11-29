const db = require("./db");
const helper = require("../helper");
const config = require("../config");
const sequelize = require("../config-db");
const initModels = require("../models/init-models");
const models = initModels(sequelize);

/*--------------------------------------------------------------------*/
async function getMultiple(page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);

  const ventas = await models.ventas.findAll({
    attributes: ["id", "fecha", "cantidad"],
    include: [
      {
        model: models.empleados,
        attributes: ["cedula", "nombre"],
        as: "fk_empleados_cedula_empleado",
      },
      {
        model: models.productos,
        attributes: ["nombre", "precio_unitario"],
        as: "fk_producto",
      },      
    ],
    offset: offset,
    limit: config.listPerPage,
  });

  const data = ventas.map((venta) => {
    const ventaJSON = venta.toJSON();
    return {
      id: ventaJSON.id,
      fecha: ventaJSON.fecha,
      //id_factura: ventaJSON.id_factura,
      cedula: ventaJSON.fk_empleados_cedula_empleado.cedula,
      nombreEmpleado: ventaJSON.fk_empleados_cedula_empleado.nombre,
      nombreProducto: ventaJSON.fk_producto.nombre,
      precio_unitario: ventaJSON.fk_producto.precio_unitario,
      cantidad: ventaJSON.cantidad,
    };
  });
  const meta = { page };

  return {
    data,
    meta,
  };
}

/*--------------------------------------------------------------------*/

/*async function getMultiple(page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT v.id, v.fecha, e.cedula, e.nombre AS nombreEmpleado, v.id_factura, p.nombre AS nombreProducto, p.precio_unitario
    FROM
    ventas v
    INNER JOIN
    empleados e
    ON e.cedula=fk_empleados_cedula 
    INNER JOIN productos p
    ON v.fk_productos_id=p.id;`
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta,
  };
}*/

/*-----------------------------------------------------------------*/
async function getIngresos(page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const ingresos = await models.ventas.findAll({
    attributes: [
      [
        sequelize.fn("SUM", sequelize.col("fk_producto.precio_unitario")),
        "Ingresos",
      ],
    ],
    include: [
      {
        model: models.productos,
        as: "fk_producto",
        attributes: [],
      },
    ],
    raw: true,
  });

  const data = helper.emptyOrRows(ingresos);
  const meta = { page };

  return {
    data,
    meta,
  };
}

/*-----------------------------------------------------------------*/

/*async function getIngresos(page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT SUM(p.precio_unitario) AS Ingresos
    FROM
    ventas v        
    INNER JOIN productos p
    ON v.fk_productos_id=p.id;`
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta,
  };
}*/

async function getPagos(page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT e.cedula, e.nombre AS nombreEmpleado, SUM(p.precio_unitario)*0.20 AS Pago
    FROM
    ventas v
    INNER JOIN
    empleados e
    ON e.cedula=fk_empleados_cedula 
    INNER JOIN productos p
    ON v.fk_productos_id=p.id
    GROUP BY e.cedula`
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta,
  };
}

async function getMasVendidos(page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT p.id AS ID, p.nombre AS ProductoNombre, v.cantidad FROM ventas v INNER JOIN productos p ON v.fk_productos_id=p.id;`
  );
  console.log(rows);
  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta,
  };
}

/*----------------------------------------------*/
async function create(ventas) {
  const fechaActual = new Date();
  const año = fechaActual.getFullYear();
  const mes = fechaActual.getMonth() + 1;
  const dia = fechaActual.getDate();
  const fechaFormateada = `${año}-${mes.toString().padStart(2, "0")}-${dia.toString().padStart(2, "0")}`;

  let message = "Error al agregar las ventas";
  let ventasCreadas = 0;

  //try {
    // Verificar los datos de entrada
    if (!Array.isArray(ventas.productos) || !ventas.ced_empleado || !ventas.ced_cliente || !ventas.facturaId) {
      throw new Error("Datos de entrada inválidos");
    }

    for (const producto of ventas.productos) {
      const nuevaVenta = {
        fecha: fechaFormateada,
        fk_empleados_cedula: ventas.ced_empleado,
        ced_cliente: ventas.ced_cliente,
        //id_factura: ventas.facturaId,
        fk_productos_id: producto.id,
        cantidad: producto.cantidad
      };

      //console.log("Nueva Venta:", nuevaVenta);

      const result = await db.query(`INSERT INTO ventas (fecha, fk_empleados_cedula, fk_productos_id, ced_cliente, cantidad) VALUES 
                                    ("${fechaFormateada}", "${nuevaVenta.fk_empleados_cedula}", ${nuevaVenta.fk_productos_id}, "${nuevaVenta.ced_cliente}", "${nuevaVenta.cantidad}");`);
   //   if (result) {
        ventasCreadas++;
  //    }
  //  }

  //  if (ventasCreadas > 0) {
 //     message = `${ventasCreadas} ventas agregadas`;
  //  }
  //} catch (error) {
  //  console.error("Error al agregar las ventas", error.message);
  //  return { message: error.message };
  }

  //return { message };
}


/*----------------------------------------------*/

/*async function create(id, venta) {
  const fechaActual = new Date();
  const año = fechaActual.getFullYear();
  const mes = fechaActual.getMonth() + 1;
  const dia = fechaActual.getDate();
  const fechaFormateada = `${año}-${mes.toString().padStart(2, "0")}-${dia
    .toString()
    .padStart(2, "0")}`;
  const result = await db.query(
    `INSERT INTO ventas 
    (fecha,fk_empleados_cedula,id_factura,fk_productos_id)
    VALUES
    ("${fechaFormateada}","${venta.cedula}","${venta.facturaId}",${id});`
  );

  let message = "Error al agregar la venta";

  if (result.affectedRows) {
    message = "Venta agregada";
  }

  return { message };
}*/

/*async function update(id, venta) {
  const result = await db.query(
    `UPDATE ventas 
    SET fecha='${venta.fecha}', fk_empleados_cedula="${venta.fk_empleados_cedula}", id_factura="${venta.id_factura}", fk_productos_id=${venta.fk_productos_id}
    WHERE id=${id};`
  );

  let message = "Error al actualizar la venta";

  if (result.affectedRows) {
    message = "Venta actualizada";
  }

  return { message };
}*/

/*---------------------------------------------------------*/
async function remove(id) {
  const result = await models.ventas.destroy({
    where: { id: id },
  });

  let message = "Error al eliminar la venta";

  if (result) {
    message = "Venta eliminada";
  }

  return { message };
}
/*---------------------------------------------------------*/

/*async function remove(id) {
  const result = await db.query(`DELETE FROM ventas WHERE id=${id}`);

  let message = "Error al eliminar la venta";

  if (result.affectedRows) {
    message = "Venta eliminada";
  }

  return { message };
}*/

module.exports = {
  getMultiple,
  create,
  remove,
  getIngresos,
  getPagos,
  getMasVendidos,
};
