//*IMPORTS ARCHIVOS AND MODELS
/* ------------------------------------------------------------- */ 
const { Recipe } = require('../db');
/* ------------------------------------------------------------- */ 

module.exports = async (idRecipe) => {
  
    const deletedRecipe = await Recipe.destroy(
        { where: 
            { 
            id: idRecipe 
            }
        }
    );

  return deletedRecipe;
};


/* ------------------------------------------------------------- */ 