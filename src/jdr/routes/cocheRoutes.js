const express = require('express');
const router = express.Router();
const cocheController = require('../controller/CocheController');

// GET /coches?marca=Toyota  → Retorna lista filtrada por marca
router.get('/coches', (req, res) => cocheController.getCochesPorMarca(req, res));

// POST /coches  → Crea un nuevo coche en la BD
router.post('/coches', (req, res) => cocheController.addCoche(req, res));

module.exports = router;
