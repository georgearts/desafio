'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('tarefas', {
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
    }  
  }, {
    schema: 'teste',
    tableName: 'tarefas',
    timestamps: false
  });  
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('tarefas');
  }
};
