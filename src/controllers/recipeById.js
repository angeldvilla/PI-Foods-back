//*IMPORTS ARCHIVOS, HELPER AND MODELS
/* ------------------------------------------------------------- */ 
require("dotenv").config();
const axios = require("axios");
const { API_KEY } = process.env;
const { Recipe, Diet } = require("../db");
/* ------------------------------------------------------------- */ 

//! EXPORTO DIRECTAMENTE LA FUNCION 
/* ------------------------------------------------------------- */ 
module.exports = async (idRecipe) => {
  try {
    
    if (isNaN(Number(idRecipe))) {
      /* const recipeDb = await Recipe.findOne({ where: {idRecipe} }) */
      const recipeDb = await Recipe.findByPk(idRecipe, {
          include: 
          {
          model: Diet,
          attributes: ["name"],
          through: { attributes: [] },
          },
      });

      if (!recipeDb) throw Error("Recipe not found");

      return {
        id: recipeDb.id,
        title: recipeDb.title,
        image: recipeDb.image,
        summary: recipeDb.summary,
        healthScore: recipeDb.healthScore,
        stepByStep: recipeDb.stepByStep,
        diets: recipeDb.diets.map(diet => diet.name)
      };
  } 
    
    else {
    
      //* SI ES UN NUMERO HACEMOS LA PETICION A LA API PASANDOLE EL ID QUE LLEGA POR PARAMS
      const { data } = await axios.get(`https://api.spoonacular.com/recipes/${idRecipe}/information?apiKey=${API_KEY}`);
    
      //* SE CREA UN OBJETO CON LAS PROPIEDADES NECESARIAS EXTRAIDAS DE LA RESPUESTA
      const apiRecipe = data
         
        if(apiRecipe.title) {
            //* Y SE RETORNA LA RECETA ESPECIFICA BUSCADA
            return {
            id: apiRecipe.id,
            title: apiRecipe.title,
            image: apiRecipe.image,
            summary: apiRecipe.summary.replace(/<[^>]+>/g,''),
            healthScore: apiRecipe.healthScore,
            stepByStep: apiRecipe.analyzedInstructions[0]?.steps.map(step => `Step: ${step.number} : ${step.step}`),
            diets: apiRecipe.diets
            }       
        };
    }

} 
    catch (error) {
      throw new Error(`Doesnt exists the recipe with ID ${idRecipe}`);
  };

};
/* ------------------------------------------------------------- */ 







/*  
 stepByStep: apiRecipe.analyzedInstructions[0]?.steps.map((step) => {
      let steps = `Step ${step.number} : ${step.step}`;
                
      let ingredients = step.ingredients.map(
      (ingredient) => `Ingredient : ${ingredient.name}`);
      return [steps, ...ingredients];
      }),
*/

/*  ingredients: apiRecipe.analyzedInstructions[0]?.steps.flatMap(step => step.ingredients.map(
                ingredient => `${ingredient.name}` ) ), 
*/