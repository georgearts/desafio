const { mock } = require('jest-mock-extended');
const { Cursos } = require('../models/Cursos');
const repoCursos = require('../repositories/repoCursos');

jest.mock('../models/Cursos', () => ({
    Cursos: mock(),
}));

describe('Testes para o repositório de cursos', () => {
    beforeEach(() => {
        Cursos.mockClear();
    });

    test('visualizarCursos retorna todos os cursos', async () => {
        Cursos.findAll.mockResolvedValue([
            { id: '123e4567-e89b-12d3-a456-426614174000', nome: 'Curso 1' },
            { id: '123e4567-e89b-12d3-a456-426614174001', nome: 'Curso 2' },
            { id: '123e4567-e89b-12d3-a456-426614174002', nome: 'Curso 3' }
        ]);

        const cursos = await repoCursos.visualizarCursos();

        expect(cursos).toHaveLength(3);
        expect(Cursos.findAll).toHaveBeenCalledTimes(1);
    });

    test('criarCurso cria um novo curso', async () => {
        const novoCurso = { id: '123e4567-e89b-12d3-a456-426614174000', nome: 'Curso 1' };
        Cursos.create.mockResolvedValue(novoCurso);

        const curso = await repoCursos.criarCurso('Curso 1');

        expect(curso).toEqual(novoCurso);
        expect(Cursos.create).toHaveBeenCalledWith({ nome: 'Curso 1' });
    });

    test('atualizarCurso atualiza um curso existente', async () => {
        const cursoExistente = { id: '123e4567-e89b-12d3-a456-426614174000', nome: 'Curso 1' };
        Cursos.update.mockResolvedValue([1]);

        const resultado = await repoCursos.atualizarCurso('123e4567-e89b-12d3-a456-426614174000', 'Curso 2');

        expect(resultado).toEqual([1]);
        expect(Cursos.update).toHaveBeenCalledWith({ nome: 'Curso 2' }, { where: { id: '123e4567-e89b-12d3-a456-426614174000' } });
    });

    test('excluirCurso exclui um curso existente', async () => {
        Cursos.destroy.mockResolvedValue(1);

        const resultado = await repoCursos.excluirCurso('123e4567-e89b-12d3-a456-426614174000');

        expect(resultado).toEqual(1);
        expect(Cursos.destroy).toHaveBeenCalledWith({ where: { id: '123e4567-e89b-12d3-a456-426614174000' } });
    });

    test('buscarCursoPorNome retorna um curso específico', async () => {
        const cursoExistente = { id: '123e4567-e89b-12d3-a456-426614174000', nome: 'Curso 1' };
        Cursos.findOne.mockResolvedValue(cursoExistente);

        const curso = await repoCursos.buscarCursoPorNome('Curso 1');

        expect(curso).toEqual('123e4567-e89b-12d3-a456-426614174000');
        expect(Cursos.findOne).toHaveBeenCalledWith({ where: { nome: 'Curso 1' } });
    });
});