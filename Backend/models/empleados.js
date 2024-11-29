const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('empleados', {
    cedula: {
      type: DataTypes.STRING(10),
      allowNull: false,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING(40),
      allowNull: false
    },
    fechaNac: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    direccion: {
      type: DataTypes.STRING(40),
      allowNull: false
    },
    telefono: {
      type: DataTypes.STRING(12),
      allowNull: false
    },
    fk_departamentos_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'departamentos',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'empleados',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "cedula" },
        ]
      },
      {
        name: "fk_departamentos_id",
        using: "BTREE",
        fields: [
          { name: "fk_departamentos_id" },
        ]
      },
    ]
  });
};
