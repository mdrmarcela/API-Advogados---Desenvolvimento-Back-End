// app/models/index.js
const conexao = require('./conexao.js');

const db = {}; // armazenar as classes e models

// === MODELS DA PROVA ===
db.usuario = require('./Usuario.js');   // arquivo: app/models/Usuario.js
db.advogado = require('./Advogado.js'); // arquivo: app/models/Advogado.js
db.processo = require('./Processo.js'); // arquivo: app/models/Processo.js

// RELACIONAMENTOS (Advogado 1:N Processo)
require('./relations.js')(conexao.models);

// sincronizar com o BD
conexao
  .sync({})
  .then(() => {
    console.log('sincronizacao com bd...');
  })
  .catch((err) => {
    console.log('falha ao sincronizar: ' + err.message);
  });

module.exports = db;
