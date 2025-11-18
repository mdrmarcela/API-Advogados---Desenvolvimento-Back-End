// models/relations.js
// relacionamentos separados em arquivo próprio
module.exports = function (models) {
  // Advogado 1:N Processo
  models.advogado.hasMany(models.processo, {
    foreignKey: 'id_advogado', // nome da FK em Processo
    onDelete: 'CASCADE',
  });

  models.processo.belongsTo(models.advogado, {
    foreignKey: 'id_advogado',
    onDelete: 'CASCADE',
  });
};
