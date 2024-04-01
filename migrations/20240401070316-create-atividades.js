'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('atividades', {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
        },
        tarefaId: {
            type: Sequelize.UUID,
            references: {
                model: 'tarefas',
                key: 'id'
            },
            onDelete: 'CASCADE',
            allowNull: false
        },
        estudanteId: {
            type: Sequelize.STRING,
            references: {
                model: 'estudantes',
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
            type: Sequelize.STRING,
            allowNull: false
        },
        horaAgendamentoTermino: {
            type: Sequelize.STRING,
            allowNull: false
        },
        horaInicio: {
            type: Sequelize.STRING,
            allowNull: true
        },
        horaTermino: {
            type: Sequelize.STRING,
            allowNull: true
        },
    }, {
        schema: 'teste',
        tableName: 'atividades',
        timestamps: false
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('atividades');
  }
};
