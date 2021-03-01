const { sequelize } = require('../db');
const { Sequelize, Model } = require('sequelize');


class User extends Model {}

User.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  name: Sequelize.STRING,
  autograph: Sequelize.STRING,
  email: Sequelize.STRING,
  qq: Sequelize.STRING,
  weixin: Sequelize.INTEGER,
  custom_fields: Sequelize.STRING,
}, {
  sequelize,
  modelName: 'User',
  tableName: 'User'
})

module.exports = User;
