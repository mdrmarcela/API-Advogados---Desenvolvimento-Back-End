// app/routes/usuario.routes.js
const express = require('express');
const router = express.Router();
const UsuarioController = require('../controllers/UsuarioController');

// criar usuário
router.post('/', UsuarioController.criar);

// listar usuários
router.get('/', UsuarioController.listar);

module.exports = router;
