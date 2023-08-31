//*CONTROLLERS
/* ------------------------------------------------------------- */ 
const getAllRecipes = require('../controllers/getAllRecipes');
const getRecipeByName = require('../controllers/getRecipeByName');
const recipeById = require('../controllers/recipeById');
const recipeCreate = require('../controllers/recipeCreate');
const updateRecipe = require('../controllers/updateRecipe');
const deleteRecipe = require('../controllers/deleteRecipe');
/* ------------------------------------------------------------- */ 
const allRecipesHandler = async (req, res) => {
    try {
        const { title } = req.query;
        
        if(title){
            const name = await getRecipeByName(title);
            
            if(name.length) return res.status(200).json(name);

            return res.status(404).send('Recipe not found');
        }

        const allRecipes = await getAllRecipes();

        return res.status(200).json(allRecipes); 

    } 
    catch (error) {
      return res.status(500).json({error: error.message})
  };
};
/* ------------------------------------------------------------- */ 

const getRecipeByIdHandler = async (req, res) => {
  try {
        const { idRecipe } = req.params;

        const recipeFound = await recipeById(idRecipe);
        return res.status(200).json(recipeFound);
    }
     catch (error) {
        return res.status(500).json({
            error: error.message
        });
    };
};
/* ------------------------------------------------------------- */ 

const createRecipeHandler = async (req, res) => {
    try { 
        const { title, image, summary, healthScore, stepByStep, diets } = req.body;

          if(!title || !image || !summary || !healthScore || !stepByStep ) {
            return res.status(400).send('Missing data');
          } 
          /* const dietsId = diets.map((dietId) => parseInt(dietId)) */
          
          const newRecipe = await recipeCreate({
            title,
            image,
            summary,
            healthScore,
            stepByStep,
            diets
           /*  diets: dietsId, */
          });
  
          return res.status(200).json(newRecipe);
  
      } catch(error){
        return res.status(500).json({ error: error.message });
      };
};
/* ------------------------------------------------------------- */ 

const updateRecipeHandler = async (req, res) => {
    try {
      const { idRecipe } = req.params;

      const { title, summary, healthScore, stepByStep, diets, image } = req.body; 
      
      const recipeUpdated = await updateRecipe(idRecipe, title, summary, healthScore, stepByStep, diets, image)

      if(!recipeUpdated) return res.status(400).send('Recipe not found or missing data for update');

      return recipeUpdated;

    } 
      catch (error) {
      res.status(500).json({ error: 'Failed to update recipe' });
      }
};
/* ------------------------------------------------------------- */ 

const deleteRecipeHandler = async (req, res) => {
    try {
      const { idRecipe } = req.params;

      const recipeDeleted = await deleteRecipe(idRecipe);
      
      if (!recipeDeleted) res.status(404).send('No such Recipe exists');

      return res.status(200).json(recipeDeleted);

    } catch (error) {
      res.status(500).json({ error: 'Failed to delete recipe' });
    }

};
/* ------------------------------------------------------------- */ 


module.exports = {
    allRecipesHandler,
    getRecipeByIdHandler,
    createRecipeHandler,
    updateRecipeHandler,
    deleteRecipeHandler
}
/* ------------------------------------------------------------- */ 