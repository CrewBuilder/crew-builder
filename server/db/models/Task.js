module.exports = function(sequelize, DataTypes) {
  var Task = sequelize.define('Task', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    points: DataTypes.INTEGER,
    limit: DataTypes.INTEGER,
    expiry: DataTypes.DATE
  });

  Task.associate = function(models) {
    Task.belongsTo(models.Crew);
    Task.belongsToMany(models.User, {through: models.User_Task, foreignKey: 'taskId'});
  };

  return Task;
};