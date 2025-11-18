// app/routes/processo.routes.js
const express = require('express');
const router = express.Router();
const ProcessoController = require('../controllers/ProcessoController');

router.post('/', ProcessoController.criar);            // criar
router.get('/', ProcessoController.listar);            // listar todos
router.get('/:id', ProcessoController.buscarPorId);    // buscar 1
router.put('/:id', ProcessoController.atualizar);      // atualizar
router.delete('/:id', ProcessoController.deletar);     // deletar

module.exports = router;
