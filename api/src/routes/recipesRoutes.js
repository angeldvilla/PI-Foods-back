//*IMPORTS ARCHIVOS, MODELOS Y SERVER
/* ------------------------------------------------------------- */ 
const { Router } = require('express');
const recipesRoutes = Router();
/* ------------------------------------------------------------- */ 

//*HANDLERS
/* ------------------------------------------------------------- */ 
const { allRecipesHandler, 
        getRecipeByIdHandler, 
        createRecipeHandler,
        updateRecipeHandler,
        deleteRecipeHandler } = require('../handlers/recipesHandler');
/* ------------------------------------------------------------- */ 


//!RUTA PARA TRAER TODAS LAS RECETAS Y POR TITLE

recipesRoutes.get('/', allRecipesHandler);
/* ------------------------------------------------------------- */ 

//!RUTA PARA MOSTRAR EL DETALLE DE UNA RECETA ESPECIFICA

recipesRoutes.get('/:idRecipe', getRecipeByIdHandler);
/* ------------------------------------------------------------- */ 

//!RUTA PARA TRAER CREAR UNA RECETA Y GUARDARLA EN LA BASE DE DATOS

recipesRoutes.post('/create', createRecipeHandler);
/* ------------------------------------------------------------- */ 

//!RUTA PARA MODIFICAR UNA RECETA

recipesRoutes.put('/edit', updateRecipeHandler);
/* ------------------------------------------------------------- */ 

//!RUTA PARA HACER UN BORRADO LÓGICO

recipesRoutes.put('/delete', deleteRecipeHandler);
/* ------------------------------------------------------------- */ 



module.exports = recipesRoutes
/* ------------------------------------------------------------- */ 