const express = require('express');
// app.js
require('./models'); // só isso já executa as associações
require('dotenv').config(); // carrega JWT_SECRET etc.
const app = express();



// middleware pra ler JSON do body
app.use(express.json());

// importa as rotas de usuário
const usuarioRoutes = require('./app/routes/usuario.routes');
app.use('/usuario', usuarioRoutes); // ← ISSO faz existir POST /usuarios

const advogadoRoutes = require('./app/routes/advogado.routes');
app.use('/advogados', auth,  advogadoRoutes);

const processoRoutes = require('./app/routes/processo.routes');
app.use('/processos', auth, processoRoutes);

// porta
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`servidor on-line na porta ${PORT}`);
});

module.exports = app;
