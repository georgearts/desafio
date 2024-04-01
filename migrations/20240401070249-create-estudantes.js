'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('estudantes', {
      cpf: {
        type: Sequelize.STRING,
        unique: true,
        primaryKey: true,
        allowNull:false,
        validate: {
          is: {
            args: /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/,
            msg: 'O campo "cpf" deve ser um CPF válido.',
          },
          notEmpty: {
            msg: 'O campo "cpf" não pode estar vazio.',
          },
          notNull: {
            msg: 'O campo "cpf" é obrigatório.',
          },
        },
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
      curso: {
        type: Sequelize.UUID,
        references: {
          model: 'cursos', // referência ao model Cursos
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      matricula: {
        type: Sequelize.STRING,
        unique: true,
      },
    }, {
      schema: 'teste',
      tableName: 'estudantes',
      timestamps: false
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('estudantes');
  }
};
