const { Sequelize, Model } = require('sequelize');
const { sequelize } = require('../db');


class Script extends Model { }

Script.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  synopsis: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  script_path: Sequelize.STRING,
  save_name: Sequelize.STRING,
  save_path: Sequelize.STRING,
}, {
  sequelize,
  modelName: 'Script',
  tableName: 'Script'
})

module.exports = Script;