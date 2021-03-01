const { Sequelize, Model } = require('sequelize');
const { sequelize } = require('../db');


class Audio extends Model {}

Audio.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  synopsis: Sequelize.STRING,
  audio_path: Sequelize.STRING,
  save_name: Sequelize.STRING,
  save_path: Sequelize.STRING,
}, {
  sequelize,
  modelName: 'Audio',
  tableName: 'Audio'
})

module.exports = Audio;