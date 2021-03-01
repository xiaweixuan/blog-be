const { sequelize } = require('../db');
const { Sequelize, Model } = require('sequelize');
const Article = require('./article')
const ArticleType = require('./articleType');

class ArticleTypeMap extends Model {}

ArticleTypeMap.init({
  article_id: {
    type: Sequelize.INTEGER,
    references: {
      model: Article,
      key: 'id'
    }
  },
  type_id: {
    type: Sequelize.INTEGER,
    references: {
      model: ArticleType,
      key: 'id'
    }
  },
}, {
  sequelize,
  modelName: 'ArticleTypeMap',
  tableName: 'Article_Type_Map'
})

Article.belongsToMany(ArticleType, { through: 'ArticleTypeMap', foreignKey: 'article_id' });
ArticleType.belongsToMany(Article, { through: 'ArticleTypeMap', foreignKey: 'type_id' });

module.exports = ArticleTypeMap;