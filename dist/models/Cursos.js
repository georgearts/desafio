"use strict";

var Sequelize = require('sequelize');
var sequelize = require('../utils/db');
var Cursos = sequelize.define('cursos', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  nome: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'O campo "nome" não pode estar vazio.'
      },
      notNull: {
        msg: 'O campo "nome" é obrigatório.'
      }
    }
  }
}, {
  schema: 'teste',
  tableName: 'cursos',
  timestamps: false
});
module.exports = {
  Cursos: Cursos
};