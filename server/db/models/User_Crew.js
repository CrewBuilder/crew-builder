module.exports = function(sequelize, DataTypes) {
  var UserCrew = sequelize.define('User_Crew', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    points: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    achievement: DataTypes.STRING,
    role: DataTypes.STRING
  });

  return UserCrew;
};