'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    facebook_id: DataTypes.STRING,
    facebook: DataTypes.JSON
  });

  User.associate = function(models) {
    User.belongsToMany(models.Task, {through: models.User_Task, foreignKey: 'user_id'});
    User.belongsToMany(models.Crew, {through: models.User_Crew, foreignKey: 'user_id'});
    User.hasMany(models.User_Crew, {foreignKey: 'user_id'});
    User.hasMany(models.User_Task, {foreignKey: 'user_id'});
  };

  return User;
};