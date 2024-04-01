"use strict";

var Sequelize = require('sequelize');
var sequelize = require('../utils/db');
var _require = require('./Tarefas'),
  Tarefas = _require.Tarefas;
var _require2 = require('./Estudantes'),
  Estudantes = _require2.Estudantes;
var Atividades = sequelize.define('atividades', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  tarefaId: {
    type: Sequelize.UUID,
    references: {
      model: Tarefas,
      key: 'id'
    },
    onDelete: 'CASCADE',
    allowNull: false
  },
  estudanteId: {
    type: Sequelize.STRING,
    references: {
      model: Estudantes,
      key: 'cpf'
    },
    onDelete: 'CASCADE',
    allowNull: false
  },
  data: {
    type: Sequelize.DATEONLY,
    allowNull: false
  },
  horaAgendamentoInicio: {
    type: Sequelize.TIME,
    allowNull: false
  },
  horaAgendamentoTermino: {
    type: Sequelize.TIME,
    allowNull: false
  },
  horaInicio: {
    type: Sequelize.STRING,
    allowNull: true
  },
  horaTermino: {
    type: Sequelize.STRING,
    allowNull: true
  }
}, {
  schema: 'teste',
  tableName: 'atividades',
  timestamps: false
});
module.exports = {
  Atividades: Atividades
};