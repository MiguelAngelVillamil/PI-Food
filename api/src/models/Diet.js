const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "diet",
    {
      id: {
        // UUID: Un ID propio de Sequelize conformado por letras y números.
        type: DataTypes.UUID,
        defaultType: DataTypes.UUIDV4,
        allowNull: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      // Si queremos traer algo de la base de datos lo distinguimos así.
      createdInDB: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    {
      timestamps: false,
    }
  );
};
