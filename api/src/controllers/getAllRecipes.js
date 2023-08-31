//*IMPORTS ARCHIVOS, HELPER AND MODELS
/* ------------------------------------------------------------- */ 
require ('dotenv').config();
const axios = require("axios");
const getInfo = require('../helpers/infoExtract');
const { API_KEY } = process.env;
const { Recipe, Diet } = require('../db');
/* ------------------------------------------------------------- */ 

//! EXPORTO DIRECTAMENTE LA FUNCION 
/* ------------------------------------------------------------- */ 
module.exports = async () => {
    try{
        const [apiResponse, dbResponse] = await Promise.all([
        //* INFO API 
        axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=100&addRecipeInformation=true`),
        
        //* INFO DB
        Recipe.findAll({ 
            include: 
                { 
                model: Diet,
                attributes: ["name"],
                through: { attributes: [] },
                },
            }),
        ]);
/* ------------------------------------------------------------- */         

        //* LLAMO MI HELPER (getInfo) Y ASI CONCATENO LA RESPUESTA DE LA API Y BASE DE DATOS
        const allRecipes = getInfo(apiResponse, dbResponse);
    
        return allRecipes;
} 

    catch(error){
        throw new Error('No recipes matches found');
    }
    
};
/* ------------------------------------------------------------- */   





/*    stepByStep: recipe.analyzedInstructions[0]?.steps.map(step => {
            
        let steps = `Step ${step.number} : ${step.step}`;
                
        let ingredients = step.ingredients.map(ingredient => `Ingredient : ${ingredient.name}`);

        return [steps, ...ingredients];
        }), 
*/