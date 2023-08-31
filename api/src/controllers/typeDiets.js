//*IMPORTS ARCHIVOS AND MODELS
/* ------------------------------------------------------------- */ 
require("dotenv").config();
const axios = require("axios");
const { API_KEY } = process.env;
const { Diet } = require("../db");
/* ------------------------------------------------------------- */ 

//! EXPORTO DIRECTAMENTE LA FUNCION 
/* ------------------------------------------------------------- */ 
module.exports = async () => {
  try {
    
    //*DECLARO EL ARRAY DONDE SE ALMACENARAN LAS DIETAS 
    let typeDiets = [];
    
    //? HAGO LA PETICION PARA TRAER LA INFO DE LA API
    const { data } = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=100&addRecipeInformation=true`
    );

    //? GUARDO LA RESPUESTA Y RECORRO EL ARRAY DE OBJETOS PARA TRAER LA INFO NECESARIA
    
    data.results.forEach((recipe) => {
      
      recipe.diets.forEach((diet) => {
        
        if (!typeDiets.includes(diet)) {
          typeDiets.push(diet);
        }
        
      });      
      /* if(recipe.vegetarian && !typeDiets.includes("vegetarian")){
        typeDiets.push("vegetarian");
      }  */     
    });
    
    
      //? GUARDAR TODAS LAS DIETAS EN LA BASE DE DATOS
      await Diet.bulkCreate(typeDiets.map(diet => ( {name : diet} ) ) );

      
      //* RETORNO EL ARRAY CARGADO CON LAS DIETAS
      return typeDiets;
    
} 
  catch (error) {
    throw new Error('Get diets fail');
  };
};
/* ------------------------------------------------------------- */ 







/* 
// AGREGARE LA PROPIEDAD VEGETARIAN MANUALMENTE
typeDiets.push("vegetarian"); 
      
  
  data.results[0].diets.map(diet => {
    if(!diets.includes(diet)) diets.push(diet); 
    })  

 typeDiets.forEach(async (diet) => {
        await Diet.create({ name: diet });
      });  
*/