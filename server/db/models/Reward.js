module.exports = function(sequelize, DataTypes) {
  var Reward = sequelize.define('reward', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    points: DataTypes.INTEGER,
    limit: DataTypes.INTEGER,
    expiry: DataTypes.DATE
  }, {
    hooks: {
      afterCreate: () => {
        Reward.expire();
      }
    }
  });

  Reward.expire = function() {
    return this.destroy({
      where: {
        expiry: {
          $lt: new Date()
        }
      }
    });
  };

  Reward.associate = function(models) {
    Reward.belongsTo(models.crew, { foreignKey: 'crew_id' });
  };

  return Reward;
};