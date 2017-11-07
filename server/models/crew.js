'use strict';
module.exports = (sequelize, DataTypes) => {
  var Crew = sequelize.define('Crew', {
    crew_name: DataTypes.STRING,
    crew_description: DataTypes.TEXT,
    crew_image: DataTypes.STRING,
    crew_url: DataTypes.STRING
  });

  Crew.associate = function(models) {
    Crew.hasMany(models.Task, {foreignKey: 'crew_id'});
    Crew.belongsToMany(models.User, {through: models.User_Crew, foreignKey: 'crew_id'});
    Crew.hasMany(models.User_Crew, {foreignKey: 'crew_id'});
  };

  return Crew;
};