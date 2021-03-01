const Article = require('./article');
const ArticleTag = require('./articleTag');
const ArticleType = require('./articleType');
const Audio = require('./audio');
const Comment = require('./comment');
const Photo = require('./photo');
const Script = require('./script');
// const Theme = require('./theme');
const User = require('./user');
require('./articleTagMap');
require('./articleTypeMap');

module.exports = {
  Article,
  ArticleTag,
  ArticleType,
  Comment,
  User,
  Audio,
  Photo,
  Script
}