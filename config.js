// config.js
module.exports = {
  dbconfig: {
    database: 'advocacia_db', // nome do banco que você criou no phpMyAdmin
    user: 'root',             // padrão do XAMPP
    passwd: '',               // senha em branco (se não configurou outra)
    host: 'localhost',
    dialect: 'mysql',

    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },

    define: {
      underscored: false,
      freezeTableName: false,
      timestamps: true, // se NÃO quiser createdAt/updatedAt, pode pôr false
      paranoid: false,
    },
  },

  // 🔐 CONFIG DO JWT
  jwt: {
    // pode deixar fixa ou pegar de variável de ambiente
    secret: process.env.JWT_SECRET || 'uma_chave_bem_grande_e_secreta',
    expiresIn: '1h', // 1 hora, combina com o que usamos no login
  },
};
