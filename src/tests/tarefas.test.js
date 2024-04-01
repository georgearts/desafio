const { mock } = require('jest-mock-extended');
const { Tarefas } = require('../models/Tarefas');
const repoTarefas = require('../repositories/repoTarefas');

jest.mock('../models/Tarefas', () => ({
    Tarefas: mock(),
}));

describe('Testes para o repositório de tarefas', () => {
    beforeEach(() => {
        Tarefas.mockClear();
    });

    test('visualizarTarefas retorna todas as tarefas', async () => {
        Tarefas.findAll.mockResolvedValue([
            { id: '123e4567-e89b-12d3-a456-426614174000', nome: 'Tarefa 1' },
            { id: '123e4567-e89b-12d3-a456-426614174001', nome: 'Tarefa 2' },
            { id: '123e4567-e89b-12d3-a456-426614174002', nome: 'Tarefa 3' }
        ]);

        const tarefas = await repoTarefas.visualizarTarefas();

        expect(tarefas).toHaveLength(3);
        expect(Tarefas.findAll).toHaveBeenCalledTimes(1);
    });

    test('criarTarefa cria uma nova tarefa', async () => {
        const novaTarefa = { nome: 'Tarefa 1' };
        Tarefas.findOne.mockResolvedValue(null);
        Tarefas.create.mockResolvedValue({ id: '123e4567-e89b-12d3-a456-426614174000', ...novaTarefa });

        const tarefa = await repoTarefas.criarTarefa(novaTarefa.nome);

        expect(tarefa).toEqual({ id: '123e4567-e89b-12d3-a456-426614174000', ...novaTarefa });
        expect(Tarefas.create).toHaveBeenCalledWith(novaTarefa);
    });

    test('criarTarefa lança um erro quando a tarefa já existe', async () => {
        const novaTarefa = { nome: 'Tarefa 1' };
        Tarefas.findOne.mockResolvedValue(novaTarefa);

        await expect(repoTarefas.criarTarefa(novaTarefa.nome)).rejects.toThrow('Tarefa já existe');
    });

    test('atualizarTarefa atualiza uma tarefa existente', async () => {
        const tarefaExistente = { id: '123e4567-e89b-12d3-a456-426614174000', nome: 'Tarefa 1' };
        Tarefas.findOne.mockResolvedValue(tarefaExistente);
        Tarefas.update.mockResolvedValue([1]);
    
        const tarefa = await repoTarefas.atualizarTarefa(tarefaExistente.id, 'Tarefa 2');
    
        expect(tarefa).toEqual([1]);
        expect(Tarefas.update).toHaveBeenCalledWith({ nome: 'Tarefa 2' }, { where: { id: tarefaExistente.id } });
    });

    test('excluirTarefa exclui uma tarefa existente', async () => {
        Tarefas.destroy.mockResolvedValue(1);

        const resultado = await repoTarefas.excluirTarefa('123e4567-e89b-12d3-a456-426614174000');

        expect(resultado).toEqual(1);
        expect(Tarefas.destroy).toHaveBeenCalledWith({ where: { id: '123e4567-e89b-12d3-a456-426614174000' } });
    });

    test('buscarTarefaPorNome retorna o ID da tarefa se ela existir', async () => {
        const tarefaExistente = { id: '123e4567-e89b-12d3-a456-426614174000', nome: 'Tarefa 1' };
        Tarefas.findOne.mockResolvedValue(tarefaExistente);
    
        const resultado = await repoTarefas.buscarTarefaPorNome(tarefaExistente.nome);
    
        expect(resultado).toEqual(tarefaExistente.id);
    });
    
    test('buscarTarefaPorNome retorna null se a tarefa não existir', async () => {
        const nomeTarefaInexistente = 'Tarefa inexistente';
        Tarefas.findOne.mockResolvedValue(null);
    
        const resultado = await repoTarefas.buscarTarefaPorNome(nomeTarefaInexistente);
    
        expect(resultado).toBeNull();
    });
});