const { sequelize } = require('../db');
const { Sequelize, Model } = require('sequelize');


class ArticleTag extends Model {}

ArticleTag.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: Sequelize.STRING(50),
}, {
  sequelize,
  modelName: 'ArticleTag',
  tableName: 'Article_Tag'
})

module.exports = ArticleTag;