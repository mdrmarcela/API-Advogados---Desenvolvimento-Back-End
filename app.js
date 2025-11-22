// app.js
const express = require('express');
require('dotenv').config(); // carrega JWT_SECRET etc.

// carrega models + relations + sync com o BD
require('./app/models'); // ← AQUI é o caminho certo

const app = express();

// middleware pra ler JSON do body
app.use(express.json());

// middleware de autenticação
const auth = require('./app/middlewares/TokenValido');

// rotas
const usuarioRoutes = require('./app/routes/usuario.routes');
const advogadoRoutes = require('./app/routes/advogado.routes');
const processoRoutes = require('./app/routes/processo.routes');

// rotas públicas
app.use('/usuario', usuarioRoutes);

// rotas protegidas
app.use('/advogados', auth.check, advogadoRoutes);
app.use('/processos', auth.check, processoRoutes);

// porta
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`servidor on-line na porta ${PORT}`);
});

module.exports = app;
