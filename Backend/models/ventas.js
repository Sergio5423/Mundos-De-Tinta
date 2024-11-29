const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ventas', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    fecha: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    fk_empleados_cedula: {
      type: DataTypes.STRING(10),
      allowNull: true,
      references: {
        model: 'empleados',
        key: 'cedula'
      }
    },
    fk_productos_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'productos',
        key: 'id'
      }
    },
    /*id_factura: {
      type: DataTypes.STRING(20),
      allowNull: true
    },*/
    cantidad: {
      type: DataTypes.STRING(3),
      allowNull: false
    },
    /*ced_empleado: {
      type: DataTypes.STRING(20),
      allowNull: false
    },*/
  }, {
    sequelize,
    tableName: 'ventas',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "fk_empleados_cedula",
        using: "BTREE",
        fields: [
          { name: "fk_empleados_cedula" },
        ]
      },
      {
        name: "fk_productos_id",
        using: "BTREE",
        fields: [
          { name: "fk_productos_id" },
        ]
      },
      {
        name: "ced_cliente",
        using: "BTREE",
        fields: [
          { name: "ced_cliente" },
        ]
      },
      {
        name: "cantidad",
        using: "BTREE",
        fields: [
          { name: "cantidad" },
        ]
      }
    ]
  });
};
