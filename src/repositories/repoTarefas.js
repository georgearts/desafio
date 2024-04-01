const { Tarefas } = require('../models/Tarefas');
const Sequelize = require('sequelize');

function visualizarTarefas() {
    return Tarefas.findAll();
}

async function criarTarefa(nome) {
    console.log(`${nome} chegou`);
    const existingTarefa = await Tarefas.findOne({ where: { nome } });
    if (!existingTarefa) {
        throw new Error('Tarefa já existe');
    }
    const tarefa = await Tarefas.create({
        nome: nome,
    });

    console.log(`Tarefa ${nome} criada com sucesso`);
    return tarefa;
}

async function atualizarTarefa(id, nome) {
    const existingTarefa = await Tarefas.findOne({ where: { id } });
    if (existingTarefa) {
        throw new Error('Tarefa já existe');
    }

    const tarefa = await Tarefas.update(
        {
            nome: nome,
        },
        {
            where: {
                id: id
            }
        }
    );

    return tarefa;
}

function excluirTarefa(id) {
    return Tarefas.destroy({
        where: {
            id: id
        }
    });
}



async function buscarTarefaPorNome(nomeTarefa) {
    const nome = nomeTarefa;
    try {
        const tarefa = await Tarefas.findOne({ where: { nome } });
        if (!tarefa) {
            return res.status(404).json({ message: 'Tarefa não encontrada' });
        }
        res.status(200).json(tarefa);
    } catch (error) {
        res.status(500).json({ message: "Erro ao executar essa função" });
    }
}

const repoTarefas = { visualizarTarefas, criarTarefa, atualizarTarefa, excluirTarefa, buscarTarefaPorNome };

module.exports = repoTarefas;