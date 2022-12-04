const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "recipe",
    {
      id: {
        // UUID: Un ID propio de Sequelize conformado por letras y números.
        type: DataTypes.UUID,
        defaultType: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      summary: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      healthScore: {
        type: DataTypes.INTEGER,
        validate: {
          min: 0,
          max: 100,
        },
        allowNull: true,
      },
      extendedIngredients: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
      },

      //Adicional traemos la imagen.
      image: {
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
