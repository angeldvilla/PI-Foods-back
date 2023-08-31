//*IMPORTS ARCHIVOS, HELPER AND MODELS
/* ------------------------------------------------------------- */ 
require ('dotenv').config();
const axios = require("axios");
const getInfo = require('../helpers/infoExtract');
const { API_KEY } = process.env;
const { Recipe, Diet } = require('../db');
const { Op } = require('sequelize');
/* ------------------------------------------------------------- */ 

//! EXPORTO DIRECTAMENTE LA FUNCION 
/* ------------------------------------------------------------- */ 
module.exports = async (title) => {
//* SE PASA POR PARAMETRO EL TITLE QUE VIENE DE LA QUERY 
    try {
        //? SE DEFINE EL TITLE EN MINUSCULAS PARA QUE NO HAYA PROBLEMAS DE TIPEO SIN IMPORTAR MIN O MAY
        let name = title.toLowerCase();
    
        const [apiResponse, dbResponse] =  await Promise.all([
        //* INFO API
        axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=100&titleMatch=${name}&addRecipeInformation=true`),
        
        //* INFO DB
        Recipe.findAll({
          where: 
          { 
            title: { [Op.iLike]: `%${name}%` }
          },
            include: 
              {
              model: Diet,
              attributes: ["name"],
              through: { attributes: [] },
              }, 
          })
        ]);
/* ------------------------------------------------------------- */      
      
        //* LLAMO MI HELPER (getInfo) Y ASI CONCATENO LA RESPUESTA DE LA API Y BASE DE DATOS 
         const nameRecipes = getInfo(apiResponse, dbResponse);

        return nameRecipes;
}
    catch(error){
      throw new Error(`Recipe with title ${title} doesnt exist `);
    }   
};
/* ------------------------------------------------------------- */ 







/*
  stepByStep: recipe.analyzedInstructions[0]?.steps.map(step => {
            
    let steps = `Step ${step.number} : ${step.step}`;
            
    let ingredients = step.ingredients.map(ingredient => `Ingredient : ${ingredient.name}`);

    return [steps, ...ingredients];
    }), 
*/