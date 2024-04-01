const repoTarefas = require('../repositories/repoTarefas');

function tarefasController() {

    async function visualizarTarefas(req, res) {
        try {
            const tarefas = await repoTarefas.visualizarTarefas();
            res.status(200).json(tarefas);
        } catch (error) {
            res.status(500).json({ message: "Não existem tarefas registradas" });
        }
    }

    async function criarTarefa(req, res) {
        const { nome } = req.body;
        try {
            const tarefa = await repoTarefas.criarTarefa(nome);
            res.status(201).json({ message: `Foi criada com sucesso a tarefa: ${tarefa.nome}` });
        } catch (error) {
            res.status(500).json({ message: "Não foi possivel registrar nova tarefa" });
        }
    }

    async function atualizarTarefa(req, res) {
        const { id } = req.params;
        const { nome } = req.body;
        try {
            await repoTarefas.atualizarTarefa(id, nome);
            res.status(200).json({ message: `A tarefa ${repoTarefas.nome} foi atualizada com sucesso.` });
        } catch (error) {
            res.status(500).json({ message: `Não foi possivel atualizar a tarefa ${repoTarefas.nome}` });
        }
    }

    async function excluirTarefa(req, res) {
        const { id } = req.params;
        try {
            await repoTarefas.excluirTarefa(id);
            res.status(200).json({ message: `A tarefa de id:${id} foi excluída com sucesso.` });
        } catch (error) {
            res.status(500).json({ message: `Não foi possivel excluir a tarefa de id: ${id}` });
        }
    }

    return { 
        visualizarTarefas: visualizarTarefas, 
        criarTarefa: criarTarefa, 
        atualizarTarefa: atualizarTarefa, 
        excluirTarefa: excluirTarefa 
    };

};

module.exports = tarefasController;