module.exports = function(sequelize, DataTypes) {
  var Task = sequelize.define('task', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    points: DataTypes.INTEGER,
    limit: DataTypes.INTEGER,
    expiry: DataTypes.DATE
  });

  Task.associate = function(models) {
    Task.belongsTo(models.crew);
    Task.belongsToMany(models.user, {through: models.user_task, foreignKey: 'taskId'});
  };

  return Task;
};