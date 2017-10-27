module.exports = function(sequelize, DataTypes) {
  var Crew = sequelize.define('crew', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    image: DataTypes.STRING
  });

  Crew.associate = function(models) {
    Crew.hasMany(models.task);
    Crew.belongsToMany(models.user, {through: models.user_crew, foreignKey: 'crewId'});
  };

  return Crew;
};