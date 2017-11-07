'use strict';
module.exports = (sequelize, DataTypes) => {
  var Task = sequelize.define('Task', {
    task_name: DataTypes.TEXT,
    task_description: DataTypes.TEXT,
    points: DataTypes.INTEGER,
    limit: DataTypes.INTEGER,
    expiry: DataTypes.DATE,
    task_url: DataTypes.TEXT
  }, {
    hooks: {
      afterCreate: () => {
        Task.expire();
      }
    }
  });

  Task.expire = function() {
    return this.destroy({
      where: {
        expiry: {
          $lt: new Date()
        }
      }
    });
  },

  Task.associate = function(models) {
    Task.belongsTo(models.Crew, {foreignKey: 'crew_id'});
    Task.belongsToMany(models.User, {through: models.User_Task, foreignKey: 'task_id'});
    Task.hasMany(models.User_Task, {foreignKey: 'task_id'});
  };

  return Task;
};