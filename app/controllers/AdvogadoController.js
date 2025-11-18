// app/controllers/AdvogadoController.js
const models = require('../models');
const { AdvogadoModel } = models.advogado;

const AdvogadoController = {
  // POST /advogados
  async criar(req, res) {
    try {
      const { nome, oab, especialidade } = req.body;

      if (!nome || !oab || !especialidade) {
        return res.status(400).json({
          erro: 'nome, oab e especialidade são obrigatórios',
        });
      }

      const advogado = await AdvogadoModel.create({ nome, oab, especialidade });
      return res.status(201).json(advogado);
    } catch (error) {
      console.error(error);
      if (error.name === 'SequelizeUniqueConstraintError') {
        return res.status(400).json({ erro: 'OAB já cadastrada' });
      }
      return res.status(500).json({ erro: 'Erro ao criar advogado' });
    }
  },

  // GET /advogados
  async listar(req, res) {
    try {
      const advogados = await AdvogadoModel.findAll();
      return res.json(advogados);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ erro: 'Erro ao listar advogados' });
    }
  },

  // GET /advogados/:id
  async buscarPorId(req, res) {
    try {
      const { id } = req.params;
      const advogado = await AdvogadoModel.findByPk(id);

      if (!advogado) {
        return res.status(404).json({ erro: 'Advogado não encontrado' });
      }

      return res.json(advogado);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ erro: 'Erro ao buscar advogado' });
    }
  },

  // PUT /advogados/:id
  async atualizar(req, res) {
    try {
      const { id } = req.params;
      const { nome, oab, especialidade } = req.body;

      const [linhasAfetadas] = await AdvogadoModel.update(
        { nome, oab, especialidade },
        { where: { id } }
      );

      if (linhasAfetadas === 0) {
        return res.status(404).json({ erro: 'Advogado não encontrado' });
      }

      const advogadoAtualizado = await AdvogadoModel.findByPk(id);
      return res.json(advogadoAtualizado);
    } catch (error) {
      console.error(error);
      if (error.name === 'SequelizeUniqueConstraintError') {
        return res.status(400).json({ erro: 'OAB já cadastrada' });
      }
      return res.status(500).json({ erro: 'Erro ao atualizar advogado' });
    }
  },

  // DELETE /advogados/:id
  async deletar(req, res) {
    try {
      const { id } = req.params;

      const apagados = await AdvogadoModel.destroy({ where: { id } });

      if (apagados === 0) {
        return res.status(404).json({ erro: 'Advogado não encontrado' });
      }

      return res.status(204).send(); // sem conteúdo
    } catch (error) {
      console.error(error);
      return res.status(500).json({ erro: 'Erro ao deletar advogado' });
    }
  },
};

module.exports = AdvogadoController;
