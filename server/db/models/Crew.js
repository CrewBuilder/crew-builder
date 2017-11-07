module.exports = function(sequelize, DataTypes) {
  var Crew = sequelize.define('crew', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    image: DataTypes.STRING
  });

  Crew.associate = function(models) {
    Crew.hasMany(models.task, { foreignKey: 'crew_id' });
    Crew.belongsToMany(models.user, { through: models.user_crew, foreignKey: 'crew_id' });
    Crew.hasMany(models.user_crew, { foreignKey: 'crew_id' });
    Crew.hasMany(models.reward, { foreignKey: 'crew_id' });
  };

  return Crew;
};