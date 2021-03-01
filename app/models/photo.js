const { Sequelize, Model } = require('sequelize');
const { sequelize } = require('../db');


class Photo extends Model {}

Photo.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  synopsis: Sequelize.STRING,
  img_path: Sequelize.STRING,
  save_name: Sequelize.STRING,
  save_path: Sequelize.STRING,
}, {
  sequelize,
  modelName: 'Photo',
  tableName: 'Photo'
})

module.exports = Photo;