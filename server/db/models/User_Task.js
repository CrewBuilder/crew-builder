module.exports = function(sequelize, DataTypes) {
  var UserTask = sequelize.define('User_Task', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    complete: {
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