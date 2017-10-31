module.exports = function(sequelize, DataTypes) {
  var UserTask = sequelize.define('user_task', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });

  UserTask.associate = models => {
    UserTask.belongsTo(models.user, {foreignKey: 'user_id'});
    UserTask.belongsTo(models.task, {foreignKey: 'task_id'});
  };

  return UserTask;
};