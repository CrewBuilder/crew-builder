module.exports = function(sequelize, DataTypes) {
  var Task = sequelize.define('task', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
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
    Task.belongsTo(models.crew, {foreignKey: 'crew_id'});
    Task.belongsToMany(models.user, {through: models.user_task, foreignKey: 'task_id'});
    Task.hasMany(models.user_task, {foreignKey: 'task_id'});
  };

  return Task;
};