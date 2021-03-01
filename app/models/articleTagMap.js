const { Sequelize, Model } = require('sequelize');
const { sequelize } = require('../db');
const Article = require('./article')
const ArticleTag = require('./articleTag')

class ArticleTagMap extends Model { }

ArticleTagMap.init({
  article_id: {
    type: Sequelize.INTEGER,
    references: {
      model: Article,
      key: 'id'
    }
  },
  tag_id: {
    type: Sequelize.INTEGER,
    references: {
      model: ArticleTag,
      key: 'id'
    }
  },
}, {
  sequelize,
  modelName: 'ArticleTagMap',
  tableName: 'Article_Tag_Map'
})

Article.belongsToMany(ArticleTag, { through: 'ArticleTagMap', foreignKey: 'article_id' });
ArticleTag.belongsToMany(Article, { through: 'ArticleTagMap', foreignKey: 'tag_id' });

module.exports = ArticleTagMap;