const { sequelize } = require('../db');
const { Sequelize, Model } = require('sequelize');


class ArticleType extends Model {}

ArticleType.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: Sequelize.STRING(50),
}, {
  sequelize,
  modelName: 'ArticleType',
  tableName: 'Article_Type'
})

module.exports = ArticleType;