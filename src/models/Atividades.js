const Sequelize = require('sequelize');
const sequelize = require('../utils/db');
const { Tarefas } = require('./Tarefas');
const { Estudantes } = require('./Estudantes');

const Atividades = sequelize.define('atividades', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
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
        type: Sequelize.UUID,
        references: {
            model: Estudantes,
            key: 'id'
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
    },
}, {
    schema: 'teste',
    tableName: 'atividades',
    timestamps: false
});

module.exports = { Atividades };