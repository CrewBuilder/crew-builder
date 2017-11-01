module.exports = function(sequelize, DataTypes) {
  var UserCrew = sequelize.define('user_crew', {
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

  UserCrew.associate = models => {
    UserCrew.belongsTo(models.user, {foreignKey: 'user_id'});
    UserCrew.belongsTo(models.crew, {foreignKey: 'crew_id'});
  };

  return UserCrew;
};