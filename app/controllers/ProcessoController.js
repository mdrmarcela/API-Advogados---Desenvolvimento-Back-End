// app/controllers/ProcessoController.js
const models = require('../models');
const { ProcessoModel } = models.processo;
const { AdvogadoModel } = models.advogado;

const Ajv = require('ajv');
const ajv = new Ajv({ allErrors: true });

const schemaProcesso = {
  type: 'object',
  required: ['numero_processo', 'descricao', 'status'],
  properties: {
    numero_processo: { type: 'string', minLength: 1 },
    descricao: { type: 'string', minLength: 1 },
    status: { type: 'string', minLength: 1 },
  },
  additionalProperties: false,
};

const validateProcesso = ajv.compile(schemaProcesso);

const ProcessoController = {
  // POST /processos  (versão "solta")
  async criar(req, res) {
    // valida com Ajv
    const valido = validateProcesso(req.body);
    if (!valido) {
      return res.status(400).json({
        erro: 'Dados inválidos para processo',
        detalhes: validateProcesso.errors,
      });
    }

    try {
      const { numero_processo, descricao, status, id_advogado } = req.body;

      if (!id_advogado) {
        return res
          .status(400)
          .json({ erro: 'id_advogado é obrigatório' });
      }

      // verifica se o advogado existe
      const advogado = await AdvogadoModel.findByPk(id_advogado);
      if (!advogado) {
        return res.status(404).json({ erro: 'Advogado não encontrado' });
      }

      const processo = await ProcessoModel.create({
        numero_processo,
        descricao,
        status,
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
    // valida com Ajv
    const valido = validateProcesso(req.body);
    if (!valido) {
      return res.status(400).json({
        erro: 'Dados inválidos para processo',
        detalhes: validateProcesso.errors,
      });
    }

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

  // ========== ROTAS ANINHADAS ==========
  // GET /advogados/:id_advogado/processos
  async listarPorAdvogado(req, res) {
    try {
      const { id_advogado } = req.params;

      const advogado = await AdvogadoModel.findByPk(id_advogado);
      if (!advogado) {
        return res.status(404).json({ erro: 'Advogado não encontrado' });
      }

      const processos = await ProcessoModel.findAll({
        where: { id_advogado },
      });

      return res.json(processos);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ erro: 'Erro ao listar processos do advogado' });
    }
  },

  // POST /advogados/:id_advogado/processos
  async criarParaAdvogado(req, res) {
    // valida com Ajv
    const valido = validateProcesso(req.body);
    if (!valido) {
      return res.status(400).json({
        erro: 'Dados inválidos para processo',
        detalhes: validateProcesso.errors,
      });
    }

    try {
      const { id_advogado } = req.params;
      const { numero_processo, descricao, status } = req.body;

      const advogado = await AdvogadoModel.findByPk(id_advogado);
      if (!advogado) {
        return res.status(404).json({ erro: 'Advogado não encontrado' });
      }

      const processo = await ProcessoModel.create({
        numero_processo,
        descricao,
        status,
        id_advogado,
      });

      return res.status(201).json(processo);
    } catch (error) {
      console.error(error);
      if (error.name === 'SequelizeUniqueConstraintError') {
        return res.status(400).json({ erro: 'numero_processo já cadastrado' });
      }
      return res.status(500).json({ erro: 'Erro ao criar processo para advogado' });
    }
  },
};

module.exports = ProcessoController;
