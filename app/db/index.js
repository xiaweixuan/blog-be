const Sequelize = require('sequelize')
const { database, host, user, password } = require('./db.config.json');

const sequelize = new Sequelize(database, user, password, {
  dialect: 'mysql',
  host,
  logging: false,
  timezone: '+08:00',
  define: {
    charset: 'utf8',
    dialectOptions: {
      collate: 'utf8_general_ci',
    },
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
})

// sequelize.sync({ force: true });
sequelize.sync();

module.exports = {
  sequelize
}