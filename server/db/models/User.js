module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('user', {
    facebook_id: DataTypes.STRING,
    facebook: DataTypes.JSON
  });

  User.associate = function(models) {
    User.belongsToMany(models.task, {through: models.user_task, foreignKey: 'user_id'});
    User.belongsToMany(models.crew, {through: models.user_crew, foreignKey: 'user_id'});
    User.hasMany(models.user_crew, {foreignKey: 'user_id'});
    User.hasMany(models.user_task, {foreignKey: 'user_id'});
  };

  return User;
};