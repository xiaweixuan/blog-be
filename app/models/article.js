const { Sequelize, Model } = require('sequelize');
const { sequelize } = require('../db');
const Comment = require('./comment');


class Article extends Model { }

Article.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: Sequelize.STRING(50),
  cover: Sequelize.STRING,
  synopsis: Sequelize.STRING,
  content: Sequelize.TEXT,
  view_count: Sequelize.INTEGER,
}, {
  sequelize,
  modelName: 'Article',
  tableName: 'Article'
})

Article.hasMany(Comment, { foreignKey: 'article_id' });
Comment.belongsTo(Article,  { foreignKey: 'article_id' });

module.exports = Article;