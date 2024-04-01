const { mock } = require('jest-mock-extended');
const { Atividades } = require('../models/Atividades');


// Mock do modelo Atividades
jest.mock('../models/Atividades', () => ({
    Atividades: mock(),
}));

const repoAtividades = require('../repositories/repoAtividades');

describe('Testes para o repositório de atividades', () => {
    beforeEach(() => {
        // Limpa os mocks antes de cada teste
        Atividades.mockClear();
    });

    test('visualizarAtividades retorna todas as atividades', async () => {
        Atividades.findAll.mockResolvedValue([
            { id: '123e4567-e89b-12d3-a456-426614174000' }, 
            { id: '123e4567-e89b-12d3-a456-426614174001' }, 
            { id: '123e4567-e89b-12d3-a456-426614174002' }
        ]);

        const atividades = await repoAtividades.visualizarAtividades();

        expect(atividades).toHaveLength(3);
        expect(Atividades.findAll).toHaveBeenCalledTimes(1);
    });

    test('criarAtividade cria uma nova atividade', async () => {
        const novaAtividade = { id: '123e4567-e89b-12d3-a456-426614174000', tarefaId: 1, estudanteId: '012.345.678-90', data: '2022-01-01', horaAgendamentoInicio: '08:00', horaAgendamentoTermino: '10:00' };
        Atividades.create.mockResolvedValue(novaAtividade);
    
        const atividade = await repoAtividades.criarAtividade(1, '012.345.678-90', '2022-01-01', '08:00', '10:00');
    
        expect(atividade).toEqual(novaAtividade);
        expect(Atividades.create).toHaveBeenCalledWith({ tarefaId: 1, estudanteId: '012.345.678-90', data: '2022-01-01', horaAgendamentoInicio: '08:00', horaAgendamentoTermino: '10:00' });
    });
    
    test('atualizarAtividade atualiza uma atividade existente', async () => {
        const dadosAtividade = { tarefaId: 1, estudanteId: '012.345.678-90', data: '2022-01-01', horaAgendamentoInicio: '08:00', horaAgendamentoTermino: '10:00' };
        Atividades.findOne.mockResolvedValue(dadosAtividade);
        Atividades.update.mockResolvedValue([1]);

        const atividade = await repoAtividades.atualizarAtividade('123e4567-e89b-12d3-a456-426614174000', dadosAtividade);

        expect(atividade).toEqual([1]);
        expect(Atividades.update).toHaveBeenCalledWith(dadosAtividade, { where: { id: '123e4567-e89b-12d3-a456-426614174000' } });
    });

    test('excluirAtividade exclui uma atividade existente', async () => {
        Atividades.destroy.mockResolvedValue(1);

        const resultado = await repoAtividades.excluirAtividade('123e4567-e89b-12d3-a456-426614174000');

        expect(resultado).toEqual(1);
        expect(Atividades.destroy).toHaveBeenCalledWith({ where: { id: '123e4567-e89b-12d3-a456-426614174000' } });
    });

    if (typeof repoAtividades.visualizarAtividadePorId === 'function') {
        test('visualizarAtividadePorId retorna uma atividade específica', async () => {
            const atividadeExistente = { id: '123e4567-e89b-12d3-a456-426614174000', tarefaId: 1, estudanteId: '012.345.678-90', data: '2022-01-01', horaAgendamentoInicio: '08:00', horaAgendamentoTermino: '10:00' };
            Atividades.findOne.mockResolvedValue(atividadeExistente);
    
            const atividade = await repoAtividades.visualizarAtividadePorId('123e4567-e89b-12d3-a456-426614174000');
    
            expect(atividade).toEqual(atividadeExistente);
            expect(Atividades.findOne).toHaveBeenCalledWith({ where: { id: '123e4567-e89b-12d3-a456-426614174000' } });
        });
    }
});