// app/routes/advogado.routes.js
const express = require('express');
const router = express.Router();
const AdvogadoController = require('../controllers/AdvogadoController');

// CRUD
router.post('/', AdvogadoController.criar);           // criar
router.get('/', AdvogadoController.listar);           // listar todos
router.get('/:id', AdvogadoController.buscarPorId);   // buscar 1
router.put('/:id', AdvogadoController.atualizar);     // atualizar
router.delete('/:id', AdvogadoController.deletar);    // deletar

module.exports = router;
