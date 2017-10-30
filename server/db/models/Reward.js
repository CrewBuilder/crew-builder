module.exports = function(sequelize, DataTypes) {
  var Reward = sequelize.define('reward', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    points: DataTypes.INTEGER,
    limit: DataTypes.INTEGER,
    expiry: DataTypes.DATE
  });

  return Reward;
};