/* ------------------------------------------------------------- */ 
const getInfo = (apiResponse, dbResponse) => {
    
    //* INFO API RECORRO LA RESPUESTA Y TRAIGO LOS DATOS IMPORTANTES
    const apiRecipes = apiResponse.data.results.map(recipe => {
        return {
          id: recipe.id,
          title: recipe.title,
          image: recipe.image,
          summary: recipe.summary.replace(/<[^>]+>/g,''),
          healthScore: recipe.healthScore,
          stepByStep: recipe.analyzedInstructions[0]?.steps.map(step => ` Step: ${step.number} : ${step.step}`),
          diets: recipe.diets
       }});
       
      //* INFO DB RECORRO LA RESPUESTA Y TRAIGO LOS DATOS IMPORTANTES
      const dbRecipes = dbResponse.map(recipe => {
        return {
            id: recipe.id,
            title: recipe.title,
            image: recipe.image ,
            healthScore: recipe.healthScore,
            summary: recipe.summary,
            stepByStep: recipe.stepByStep,
            diets: recipe.diets.map(diet => diet.name)
        }
    });
    
    const allRecipes = [...apiRecipes, ...dbRecipes];
    
    return allRecipes;
};
/* ------------------------------------------------------------- */ 
module.exports = getInfo;
/* ------------------------------------------------------------- */ 








/*  
ingredients: recipe.analyzedInstructions[0]?.steps.flatMap(step => step.ingredients.map(
              ingredient => `${ingredient.name}` ) ), 
*/