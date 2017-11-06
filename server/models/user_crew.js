'use strict';
module.exports = (sequelize, DataTypes) => {
  var User_Crew = sequelize.define('User_Crew', {
    points: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    achievement: {
      type: DataTypes.STRING,
      defaultValue: 'Newbie'
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: 'member'
    }
  });

  User_Crew.associate = models => {
    User_Crew.belongsTo(models.User, {foreignKey: 'user_id'});
    User_Crew.belongsTo(models.Crew, {foreignKey: 'crew_id'});
  };

  return User_Crew;
};