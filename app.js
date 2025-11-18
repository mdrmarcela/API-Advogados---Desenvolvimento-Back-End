const express = require('express');
const app = express();

// middleware pra ler JSON do body
app.use(express.json());

// importa as rotas de usuário
const usuarioRoutes = require('./app/routes/usuario.routes');
app.use('/usuarios', usuarioRoutes); // ← ISSO faz existir POST /usuarios

const advogadoRoutes = require('./app/routes/advogado.routes');
app.use('/advogados', advogadoRoutes);

const processoRoutes = require('./app/routes/processo.routes');
app.use('/processos', processoRoutes);

// porta
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`servidor on-line na porta ${PORT}`);
});

module.exports = app;
