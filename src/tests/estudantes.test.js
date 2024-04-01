const { mock } = require('jest-mock-extended');
const { Estudantes } = require('../models/Estudantes');
const repoEstudantes = require('../repositories/repoEstudantes');

jest.mock('../models/Estudantes', () => ({
    Estudantes: mock(),
}));

describe('Testes para o repositório de estudantes', () => {
    beforeEach(() => {
        Estudantes.mockClear();
    });

    test('visualizarEstudantes retorna todos os estudantes', async () => {
        Estudantes.findAll.mockResolvedValue([
            { cpf: '000.000.000-11', nome: 'Estudante 1', cursoId: '123e4567-e89b-12d3-a456-426614174000', matricula: '2022-0001' },
            { cpf: '000.000.000-12', nome: 'Estudante 2', cursoId: '123e4567-e89b-12d3-a456-426614174001', matricula: '2022-0002' },
            { cpf: '000.000.000-13', nome: 'Estudante 3', cursoId: '123e4567-e89b-12d3-a456-426614174002', matricula: '2022-0003' }
        ]);

        const estudantes = await repoEstudantes.visualizarEstudantes();

        expect(estudantes).toHaveLength(3);
        expect(Estudantes.findAll).toHaveBeenCalledTimes(1);
    });

    test('criarEstudante cria um novo estudante', async () => {
        const novoEstudante = { cpf: '000.000.000-11', nome: 'Estudante 1', cursoId: '123e4567-e89b-12d3-a456-426614174000', matricula: '2022-0001' };
        Estudantes.findOne.mockResolvedValue(null);
        Estudantes.create.mockResolvedValue(novoEstudante);

        const estudante = await repoEstudantes.criarEstudante(novoEstudante);

        expect(estudante).toEqual(novoEstudante);
        expect(Estudantes.create).toHaveBeenCalledWith({
            cpf: novoEstudante.cpf,
            nome: novoEstudante.nome,
            curso: novoEstudante.cursoId,
            matricula: novoEstudante.matricula
        });
    });

    test('atualizarEstudante atualiza um estudante existente', async () => {
        const estudanteExistente = { cpf: '000.000.000-11', nome: 'Estudante 1', curso: '123e4567-e89b-12d3-a456-426614174000', matricula: '2022-0001' };
        Estudantes.update.mockResolvedValue([1]);

        const resultado = await repoEstudantes.atualizarEstudante('000.000.000-11', 'Estudante 2', '123e4567-e89b-12d3-a456-426614174001', '2022-0002');

        expect(resultado).toEqual([1]);
        expect(Estudantes.update).toHaveBeenCalledWith({ nome: 'Estudante 2', curso: '123e4567-e89b-12d3-a456-426614174001', matricula: '2022-0002' }, { where: { cpf: '000.000.000-11' } });
    });

    test('excluirEstudante exclui um estudante existente', async () => {
        Estudantes.destroy.mockResolvedValue(1);

        const resultado = await repoEstudantes.excluirEstudante('000.000.000-11');

        expect(resultado).toEqual(1);
        expect(Estudantes.destroy).toHaveBeenCalledWith({ where: { cpf: '000.000.000-11' } });
    });
});