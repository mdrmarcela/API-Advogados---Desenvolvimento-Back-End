// models/Usuario.js
const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');
const db = require('./conexao.js');

class Usuario {
  #nome;
  #email;
  #senha;

  constructor() {}

  get nome() {
    return this.#nome;
  }
  set nome(nome) {
    this.#nome = nome;
  }

  get email() {
    return this.#email;
  }
  set email(email) {
    this.#email = email;
  }

  get senha() {
    return this.#senha;
  }
  set senha(senha) {
    this.#senha = senha;
  }

  static async create(novoUsuario) {
    try {
      const usuario = await UsuarioModel.create({
        nome: novoUsuario.nome,
        email: novoUsuario.email,
        senha: novoUsuario.senha, // será hasheada no hook
      });
      return usuario;
    } catch (error) {
      throw error;
    }
  }

  static async findOne(dados) {
    try {
      const resultado = await UsuarioModel.findOne({ where: dados });
      return resultado || null;
    } catch (error) {
      throw error;
    }
  }

  // opcional: para login depois
  static async checkPassword(email, senhaEmTexto) {
    try {
      const usuario = await UsuarioModel.findOne({ where: { email } });
      if (!usuario) return null;

      const ok = await bcrypt.compare(senhaEmTexto, usuario.senha);
      if (!ok) return null;

      return usuario;
    } catch (error) {
      throw error;
    }
  }
}

const UsuarioModel = db.define(
  'usuario',
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    nome: {
      type: Sequelize.STRING(200),
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING(80),
      allowNull: false,
      unique: true, // enunciado pede email único
    },
    senha: {
      type: Sequelize.STRING(255), // hash é maior
      allowNull: false,
    },
  },
  {
    tableName: 'usuarios',
    hooks: {
      async beforeCreate(usuario) {
        if (usuario.senha) {
          const hash = await bcrypt.hash(usuario.senha, 10);
          usuario.senha = hash;
        }
      },
      async beforeUpdate(usuario) {
        if (usuario.changed('senha')) {
          const hash = await bcrypt.hash(usuario.senha, 10);
          usuario.senha = hash;
        }
      },
    },
  }
);

module.exports = { Usuario, UsuarioModel };
