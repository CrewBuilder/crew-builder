module.exports = function(sequelize, DataTypes) {
  var Crew = sequelize.define('Crew', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    image: DataTypes.STRING
  });

  Crew.associate = function(models) {
    Crew.hasMany(models.Task);
    Crew.belongsToMany(models.User, {through: models.User_Crew, foreignKey: 'crewId'});
  };

  return Crew;
};