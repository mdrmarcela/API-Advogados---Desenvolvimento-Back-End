// app/controllers/ProcessoController.js
const models = require('../models');
const { ProcessoModel } = models.processo;
const { AdvogadoModel } = models.advogado;

const ProcessoController = {
  // POST /processos
  async criar(req, res) {
    try {
      const { numero_processo, descricao, status, id_advogado } = req.body;

      if (!numero_processo || !id_advogado) {
        return res
          .status(400)
          .json({ erro: 'numero_processo e id_advogado são obrigatórios' });
      }

      // verifica se o advogado existe
      const advogado = await AdvogadoModel.findByPk(id_advogado);
      if (!advogado) {
        return res.status(404).json({ erro: 'Advogado não encontrado' });
      }

      const processo = await ProcessoModel.create({
        numero_processo,
        descricao,
        status: status || 'aberto',
        id_advogado,
      });

      return res.status(201).json(processo);
    } catch (error) {
      console.error(error);
      if (error.name === 'SequelizeUniqueConstraintError') {
        return res.status(400).json({ erro: 'numero_processo já cadastrado' });
      }
      return res.status(500).json({ erro: 'Erro ao criar processo' });
    }
  },

  // GET /processos
  async listar(req, res) {
    try {
      const processos = await ProcessoModel.findAll();
      return res.json(processos);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ erro: 'Erro ao listar processos' });
    }
  },

  // GET /processos/:id
  async buscarPorId(req, res) {
    try {
      const { id } = req.params;
      const processo = await ProcessoModel.findByPk(id);

      if (!processo) {
        return res.status(404).json({ erro: 'Processo não encontrado' });
      }

      return res.json(processo);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ erro: 'Erro ao buscar processo' });
    }
  },

  // PUT /processos/:id
  async atualizar(req, res) {
    try {
      const { id } = req.params;
      const { numero_processo, descricao, status, id_advogado } = req.body;

      if (id_advogado) {
        const advogado = await AdvogadoModel.findByPk(id_advogado);
        if (!advogado) {
          return res.status(404).json({ erro: 'Advogado não encontrado' });
        }
      }

      const [linhasAfetadas] = await ProcessoModel.update(
        { numero_processo, descricao, status, id_advogado },
        { where: { id } }
      );

      if (linhasAfetadas === 0) {
        return res.status(404).json({ erro: 'Processo não encontrado' });
      }

      const processoAtualizado = await ProcessoModel.findByPk(id);
      return res.json(processoAtualizado);
    } catch (error) {
      console.error(error);
      if (error.name === 'SequelizeUniqueConstraintError') {
        return res.status(400).json({ erro: 'numero_processo já cadastrado' });
      }
      return res.status(500).json({ erro: 'Erro ao atualizar processo' });
    }
  },

  // DELETE /processos/:id
  async deletar(req, res) {
    try {
      const { id } = req.params;

      const apagados = await ProcessoModel.destroy({ where: { id } });

      if (apagados === 0) {
        return res.status(404).json({ erro: 'Processo não encontrado' });
      }

      return res.status(204).send();
    } catch (error) {
      console.error(error);
      return res.status(500).json({ erro: 'Erro ao deletar processo' });
    }
  },
};

module.exports = ProcessoController;
