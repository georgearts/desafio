const repoAtividades = require('../repositories/repoAtividades');

function atividadesController() {

    async function visualizarAtividades(req, res) {
        try {
            const atividades = await repoAtividades.visualizarAtividades();
            res.status(200).json(atividades);
        } catch (error) {
            res.status(500).json({ message: "Não existem atividades registradas" });
        }
    }

    async function criarAtividade(req, res) {
        const { tarefaId, estudanteId, data, horaAgendamentoInicio, horaAgendamentoTermino } = req.body;
        try {
            const dataInicio = horaAgendamentoInicio;
            const dataTermino = horaAgendamentoTermino;

            // Verifica se a duração da atividade não ultrapassa 6 horas
            if ((dataTermino - dataInicio) > 6 * 60 * 60 * 1000) {
                throw new Error('A duração da atividade não pode ultrapassar 6 horas.');
            }

            // Verifica se a data e hora de término não são anteriores à data e hora de início
            if (dataTermino < dataInicio) {
                throw new Error('Data e hora de término não podem ser anteriores à data e hora de início.');
            }

            const atividade = await repoAtividades.criarAtividade(tarefaId, estudanteId, data, dataInicio, horaAgendamentoTermino);
            res.status(201).json({ message: `Atividade ${data} com Hora de início ${horaAgendamentoInicio} criada com sucesso` });
        } catch (error) {
            res.status(500).json({ message: `Não foi possivel registrar nova atividade: ${error.message}` });
        }
    }

    async function iniciarAtividade(req, res) {
        const { id, horaInicio } = req.body;
       
        try {
            const dadosAtividade = await repoAtividades.visualizarAtividadePorId(id);
            const { tarefaId, estudanteId, data, horaAgendamentoInicio, horaAgendamentoTermino, horaTermino } = dadosAtividade;
            const horaInicioAtividade = new Date(`1970-01-01T${horaInicio}:00`);
            const horaAgendadaInicio = new Date(`1970-01-01T${horaAgendamentoInicio}:00`);
            const diferenca = Math.abs(horaInicioAtividade.getTime() - horaAgendadaInicio.getTime());
            if (diferenca > 15 * 60 * 1000) {
                throw new Error('A atividade só pode ser iniciada com uma tolerância de 15 minutos para mais ou para menos.');
            }
            await repoAtividades.atualizarAtividade(id, dadosAtividade, horaInicio);
            res.status(200).json({ message: `A atividade foi iniciada com sucesso.` });
        } catch (error) {
            res.status(500).json({ message: `Não foi possivel iniciar a atividade: ${error.message}` });
        }
    }

    async function atualizarAtividade(req, res) {
        const { id, tarefaId, estudanteId, data, horaAgendamentoInicio, horaAgendamentoTermino, horaInicio } = req.body;
        try {
            const dataInicio = horaAgendamentoInicio;
            const dataTermino = horaAgendamentoTermino;
            const dataInicioAtividade = data;

            // Verifica se a duração da atividade não ultrapassa 6 horas
            if ((dataTermino - dataInicio) > 6 * 60 * 60 * 1000) {
                throw new Error('A duração da atividade não pode ultrapassar 6 horas.');
            }

            // Verifica se a data e hora de término não são anteriores à data e hora de início
            if (dataTermino < dataInicio) {
                throw new Error('Data e hora de término não podem ser anteriores à data e hora de início.');
            }

            // Verifica se a atividade só pode ser iniciada com uma tolerância de 15 minutos para mais ou para menos
            const diferenca = Math.abs(dataInicioAtividade - dataInicio);
            if (diferenca > 15 * 60 * 1000) {
                throw new Error('A atividade só pode ser iniciada com uma tolerância de 15 minutos para mais ou para menos.');
            }

            const atividade = await repoAtividades.atualizarAtividade(id, tarefaId, estudanteId, data, dataInicio, horaAgendamentoTermino, dataInicioAtividade);
            res.status(200).json({ message: `Atividade com data: ${data} e com Hora de início: ${horaAgendamentoInicio} atualizada com sucesso` });
        } catch (error) {
            res.status(500).json({ message: `Não foi possivel registrar nova atividade: ${error.message}`});
        }
    }

    async function excluirAtividade(req, res) {
        const { id } = req.params;
        try {
            await repoAtividades.excluirAtividade(id);
            res.status(200).json({ message: `A atividade de id:${id} foi excluída com sucesso.` });
        } catch (error) {
            res.status(500).json({ message: `Não foi possivel excluir a atividade de id: ${id}` });
        }
    }
       
    async function finalizarAtividade(req, res) {
        const { id, horaTermino } = req.body;

        try {
            const dadosAtividade = await repoAtividades.visualizarAtividadePorId(id);
            const { tarefaId, estudanteId, data, horaAgendamentoInicio, horaAgendamentoTermino } = dadosAtividade;
            
            await repoAtividades.atualizarAtividade(id, dadosAtividade, undefined, horaTermino);
            res.status(200).json({ message: `A atividade foi finalizada com sucesso.` });
        } catch (error) {
            res.status(500).json({ message: `Não foi possivel finalizar a atividade: ${error.message}` });
        }
    }

    return { 
        visualizarAtividades: visualizarAtividades, 
        criarAtividade: criarAtividade, 
        atualizarAtividade: atualizarAtividade, 
        excluirAtividade: excluirAtividade,
        finalizarAtividade: finalizarAtividade,
        iniciarAtividade: iniciarAtividade
    };

};

module.exports = atividadesController;