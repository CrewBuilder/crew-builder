module.exports = function(sequelize, DataTypes) {
  var Reward = sequelize.define('Reward', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    points: DataTypes.INTEGER,
    limit: DataTypes.INTEGER,
    expiry: DataTypes.DATE
  });

  return Reward;
};