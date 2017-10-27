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

  return UserTask;
};