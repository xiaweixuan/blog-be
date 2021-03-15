const { Sequelize, Model } = require('sequelize');
const { sequelize } = require('../db');
const Comment = require('./comment');


class Article extends Model { }

Article.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: Sequelize.STRING(50),
    allowNull: true,
  },
  cover: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  synopsis: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: true,
  },
  view_count: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  json_content: {
    type: Sequelize.TEXT,
    allowNull: true,
  },
}, {
  sequelize,
  modelName: 'Article',
  tableName: 'Article'
})

Article.hasMany(Comment, { foreignKey: 'article_id' });
Comment.belongsTo(Article, { foreignKey: 'article_id' });

module.exports = Article;