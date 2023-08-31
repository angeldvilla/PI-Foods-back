//*IMPORT MODEL
/* ------------------------------------------------------------- */ 
const { Recipe } = require('../db');
/* ------------------------------------------------------------- */ 


//! EXPORTO DIRECTAMENTE LA FUNCION 
/* ------------------------------------------------------------- */ 
module.exports = async ({ title, image, summary, healthScore, stepByStep, diets }) => {
 
    try{
        const recipeNew = await Recipe.create({
            title, 
            image, 
            summary, 
            healthScore, 
            stepByStep,
        });
      
        recipeNew.addDiets(diets);
    
        return recipeNew;

}
    catch (error){
        throw new Error('Failed to create recipe');
    }
};

/* ------------------------------------------------------------- */