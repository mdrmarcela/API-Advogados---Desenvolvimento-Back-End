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
};

