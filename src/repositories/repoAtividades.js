const { Atividades } = require('../models/Atividades');

function visualizarAtividades() {
    return Atividades.findAll();
}

async function criarAtividade(tarefaId, estudanteId, data, horaAgendamentoInicio, horaAgendamentoTermino, horaInicio, horaTermino) {
    const atividade = await Atividades.create({
        tarefaId: tarefaId,
        estudanteId: estudanteId,
        data: data,
        horaAgendamentoInicio: horaAgendamentoInicio,
        horaAgendamentoTermino: horaAgendamentoTermino,
        horaInicio: horaInicio,
        horaTermino: horaTermino
    });

    return atividade;
}

async function atualizarAtividade(id, dadosAtividade) {
    const { tarefaId, estudanteId, data, horaAgendamentoInicio, horaAgendamentoTermino, horaInicio, horaTermino } = dadosAtividade;
    const atividadeExistente = await Atividades.findOne({ where: { id } });
    if (!atividadeExistente) {
        throw new Error('Atividade não existe');
    }
    const atividade = await Atividades.update(
        {
            tarefaId,
            estudanteId,
            data,
            horaAgendamentoInicio,
            horaAgendamentoTermino,
            horaInicio,
            horaTermino
        },
        {
            where: {
                id
            }
        }
    );

    return atividade;
}

function excluirAtividade(id) {
    return Atividades.destroy({
        where: {
            id: id
        }
    });
}

async function visualizarAtividadePorId(id) {
    try {
        const atividade = await Atividades.findOne({
            where: {
                id: id
            }
        });
        if (!atividade) {
            throw new Error('Atividade não encontrada');
        }
        return atividade;
    } catch (error) {
        throw error;
    }
}

const repoAtividades = { visualizarAtividades, criarAtividade, atualizarAtividade, excluirAtividade };

module.exports = repoAtividades;