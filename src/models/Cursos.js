const Sequelize = require('sequelize');
const sequelize = require('../utils/db');


const Cursos = sequelize.define('cursos', {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    nome: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'O campo "nome" não pode estar vazio.',
        },
        notNull: {
          msg: 'O campo "nome" é obrigatório.',
        },
      },
    },
  }, {
    schema: 'teste',
    tableName: 'cursos',
    timestamps: false
  });
  
   
  const modelCursos = { Cursos };
  
  module.exports = modelCursos;

