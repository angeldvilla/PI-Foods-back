//*IMPORTS MODELS
/* ------------------------------------------------------------- */ 
const { Recipe, Diet } = require("../db");
/* ------------------------------------------------------------- */ 

//! EXPORTO DIRECTAMENTE LA FUNCION 
/* ------------------------------------------------------------- */ 
module.exports = async ({ idRecipe, title, summary, healthScore, stepByStep, diets, image })  => {
    try {  
        
        const dbResponse = await Recipe.findOne({ where: { idRecipe } })

        if(!dbResponse) throw new Error("Recipe not found");

        dbResponse.title = title;
        dbResponse.summary = summary;
        dbResponse.healthScore = healthScore; 
        dbResponse.stepByStep = stepByStep;

        await dbResponse.setDiets([]);

          for(const diet of diets){
            const newDiets = await Diet.findOne({ where: { name: diet } });
            
            if(newDiets){
                await dbResponse.addDiets(newDiets)
            }
          }
    
        dbResponse.image = image;

        await dbResponse.save();

        return { message: `${dbResponse} update successfully` };
} 
    catch (error) {
    throw new Error('It went wrong, could not update the recipe');    
    }
};
/* ------------------------------------------------------------- */ 