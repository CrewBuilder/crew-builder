module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    facebookId: DataTypes.STRING,
    facebook: DataTypes.JSON
  });

  User.associate = function(models) {
    User.belongsToMany(models.Task, {through: models.User_Task, foreignKey: 'userId'});
    User.belongsToMany(models.Crew, {through: models.User_Crew, foreignKey: 'userId'});
  };

  return User;
};