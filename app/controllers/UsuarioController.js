// app/controllers/UsuarioController.js
const models = require('../models');
const { UsuarioModel } = models.usuario; // vem de module.exports = { Usuario, UsuarioModel }
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../../config.js'); // mesmo caminho que o tokenValido usa

const UsuarioController = {
  // POST /usuarios  (cadastro)
  async criar(req, res) {
    try {
      const { nome, email, senha } = req.body;

      if (!nome || !email || !senha) {
        return res
          .status(400)
          .json({ erro: 'nome, email e senha são obrigatórios' });
      }

      // evita cadastro duplicado
      const usuarioExistente = await UsuarioModel.findOne({ where: { email } });
      if (usuarioExistente) {
        return res.status(409).json({ erro: 'E-mail já cadastrado' });
      }

      // senha será hasheada pelo hook do model
      const usuario = await UsuarioModel.create({ nome, email, senha });

      // remove a senha da resposta
      const { senha: _senha, ...usuarioSemSenha } = usuario.toJSON();

      return res.status(201).json(usuarioSemSenha);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ erro: 'Erro ao criar usuário' });
    }
  },

  // POST /usuarios/login  (login + geração do token)
  async login(req, res) {
    try {
      const { email, senha } = req.body;

      if (!email || !senha) {
        return res
          .status(400)
          .json({ erro: 'email e senha são obrigatórios' });
      }

      const usuario = await UsuarioModel.findOne({ where: { email } });

      if (!usuario) {
        return res.status(401).json({ erro: 'Credenciais inválidas' });
      }

      const senhaConfere = await bcrypt.compare(senha, usuario.senha);
      if (!senhaConfere) {
        return res.status(401).json({ erro: 'Credenciais inválidas' });
      }

      const payload = {
        id: usuario.id,
        email: usuario.email,
        nome: usuario.nome,
      };

      const token = jwt.sign(payload, config.jwt.secret, {
        expiresIn: config.jwt.expiresIn || '1h',
      });

      const { senha: _senha, ...usuarioSemSenha } = usuario.toJSON();

      return res.json({
        usuario: usuarioSemSenha,
        token,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ erro: 'Erro ao realizar login' });
    }
  },

  // GET /usuarios  (vamos deixar protegido com JWT)
  async listar(req, res) {
    try {
      const usuarios = await UsuarioModel.findAll({
        attributes: { exclude: ['senha'] },
      });
      return res.json(usuarios);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ erro: 'Erro ao listar usuários' });
    }
  },
};

module.exports = UsuarioController;
