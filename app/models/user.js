const { sequelize } = require('../db');
const { Sequelize, Model } = require('sequelize');


class User extends Model { }

User.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  autograph: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  qq: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  weixin: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  custom_fields: {
    type: Sequelize.STRING,
    allowNull: true,
  },
}, {
  sequelize,
  modelName: 'User',
  tableName: 'User'
})

module.exports = User;
