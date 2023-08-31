//*IMPORTS ARCHIVOS, MODELOS Y SERVER
/* ------------------------------------------------------------- */ 
const { Router } = require('express');
const dietsRoutes = Router();
/* ------------------------------------------------------------- */ 


//*HANDLERS
/* ------------------------------------------------------------- */ 
const getDiets = require('../handlers/dietsHandler');
/* ------------------------------------------------------------- */ 

//!RUTA PARA CARGAR LAS DIETAS
dietsRoutes.get('/', getDiets);

/* ------------------------------------------------------------- */ 
module.exports = dietsRoutes
/* ------------------------------------------------------------- */ 