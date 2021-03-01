const { Sequelize, Model } = require('sequelize');
const { sequelize } = require('../db');


class Comment extends Model {}

Comment.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  content: Sequelize.TEXT,
  author: Sequelize.STRING,
  email: Sequelize.STRING,
}, {
  sequelize,
  modelName: 'Comment',
  tableName: 'Comments'
})

module.exports = Comment;