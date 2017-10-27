module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('user', {
    facebookId: DataTypes.STRING,
    facebook: DataTypes.JSON
  });

  User.associate = function(models) {
    User.belongsToMany(models.task, {through: models.user_task, foreignKey: 'userId'});
    User.belongsToMany(models.crew, {through: models.user_crew, foreignKey: 'userId'});
  };

  return User;
};