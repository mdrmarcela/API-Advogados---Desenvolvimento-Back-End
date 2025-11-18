// app/controllers/UsuarioController.js
const models = require('../models');
const { UsuarioModel } = models.usuario; // vem de module.exports = { Usuario, UsuarioModel }

const UsuarioController = {
  // POST /usuarios
  async criar(req, res) {
    try {
      const { nome, email, senha } = req.body;

      if (!nome || !email || !senha) {
        return res.status(400).json({ erro: 'nome, email e senha são obrigatórios' });
      }

      const usuario = await UsuarioModel.create({ nome, email, senha });
      return res.status(201).json(usuario);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ erro: 'Erro ao criar usuário' });
    }
  },

  // GET /usuarios
  async listar(req, res) {
    try {
      const usuarios = await UsuarioModel.findAll();
      return res.json(usuarios);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ erro: 'Erro ao listar usuários' });
    }
  },
};

module.exports = UsuarioController;
