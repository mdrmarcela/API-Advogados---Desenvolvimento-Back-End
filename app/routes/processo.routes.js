const express = require('express');
const router = express.Router();
const ProcessoController = require('../controllers/ProcessoController');
const TokenValido = require('../middlewares/TokenValido');

// protege TODAS as rotas de processo
router.use(TokenValido.check);

router.post('/', ProcessoController.criar);            // criar
router.get('/', ProcessoController.listar);            // listar todos
router.get('/:id', ProcessoController.buscarPorId);    // buscar 1
router.put('/:id', ProcessoController.atualizar);      // atualizar
router.delete('/:id', ProcessoController.deletar);     // deletar

module.exports = router;
