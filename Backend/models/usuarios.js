const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('usuarios', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    correo: {
      type: DataTypes.STRING(40),
      allowNull: false
    },
    'contraseña': {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    fk_empleados_cedula: {
      type: DataTypes.STRING(10),
      allowNull: true,
      references: {
        model: 'empleados',
        key: 'cedula'
      }
    }
  }, {
    sequelize,
    tableName: 'usuarios',
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
    ]
  });
};
