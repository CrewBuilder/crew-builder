module.exports = function(sequelize, DataTypes) {
  const Crews_Tasks = sequelize.define('crews_tasks', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    }
  });

  // create a junction table when both Tasks and Crews are resolved

}

