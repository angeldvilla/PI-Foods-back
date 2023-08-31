const DataTypes = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
/* ------------------------------------------------------------- */ 
module.exports = (sequelize) => {
  // defino el modelo
/* ------------------------------------------------------------- */ 
  sequelize.define('recipe', {
    id:{
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },

    title:{
      type: DataTypes.STRING,
      allowNull: false,
    },

    image:{
      type: DataTypes.TEXT,
      allowNull: false,
    },

    summary:{
      type: DataTypes.TEXT,
      allowNull:false,
    },

    healthScore: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: {
          args: 1,
          msg: 'The healthScore must be greater than or equal to 1.',
        },
        isInt: {
          msg: 'The healthScore must be a integer number.',
        },
        notNegative(value) {
          if (value < 0) {
            throw new Error('The healthScore cannot be a negative number.');
          }
        },
      },
    },

    stepByStep:{
      type: DataTypes.TEXT,
      allowNull:false,
    },

   /*  activo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    }, */

  },

  {timestamps: false},
  
  );
};
/* ------------------------------------------------------------- */ 