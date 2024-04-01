"use strict";

var _require = require('sequelize'),
  Sequelize = _require.Sequelize;
require('dotenv').config();
var sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: 'postgres',
  ssl: {
    rejectUnauthorized: false
  },
  logging: false
});
sequelize.authenticate().then(function () {
  console.log('Conexão com o banco de dados estabelecida com sucesso!');
})["catch"](function (error) {
  console.error('Erro ao conectar com o banco de dados:', error);
});
module.exports = sequelize;