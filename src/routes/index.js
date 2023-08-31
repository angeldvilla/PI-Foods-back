const { Router } = require('express');
const router = Router();
/* ------------------------------------------------------------- */ 
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const recipesRoutes = require('./recipesRoutes');
const dietsRoutes = require('./dietsRoutes');
/* ------------------------------------------------------------- */ 

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
/* ------------------------------------------------------------- */ 
router.use('/recipes', recipesRoutes);
router.use('/diets', dietsRoutes);
/* ------------------------------------------------------------- */ 


/* ------------------------------------------------------------- */ 
module.exports = router;
/* ------------------------------------------------------------- */ 