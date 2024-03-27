const repoEstudantes = require('../repositories/repoEstudantes');
const repoCursos = require('../repositories/repoCursos');

function estudantesController() {

async function visualizarEstudantes(req, res) {
    try {
        const estudantes = await repoEstudantes.visualizarEstudantes();
        res.status(200).json(estudantes);
    } catch (error) {
        res.status(500).json({ message: "Não existem estudantes registrados" });
    }
}

async function criarEstudante(req, res) {
    const { cpf, nome, nomeCurso, matricula } = req.body;
    console.log(nome);
    try {
        // Buscar o curso pelo nome
        const curso = await repoCursos.buscarCursoPorNome(nomeCurso);
        if (!curso) {
            return res.status(400).json({ message: `O curso ${curso.nome} não foi encontrado.` });
        }

        // Criar o estudante com o ID do curso
        const estudante = await repoEstudantes.criarEstudante({ cpf, nome, cursoId: curso, matricula });
        
        res.status(201).json({ message: `Foi criado com sucesso o estudante: ${estudante.nome}` });
    } catch (error) {
        res.status(500).json({ message: "Não foi possivel registrar novo estudante" });
    }
}

async function atualizarEstudante(req, res) {
    const { cpf } = req.params;
    const { nome, curso, matricula } = req.body;
    try {
        await repoEstudantes.atualizarEstudante(cpf, nome, curso, matricula);
        res.status(200).json({ message: `O estudante ${nome} foi atualizado com sucesso.` });
    } catch (error) {
        res.status(500).json({ message: `Não foi possivel atualizar o estudante ${nome}` });
    }
}

async function excluirEstudante(req, res) {
    const { cpf } = req.params;
    try {
        await repoEstudantes.excluirEstudante(cpf);
        res.status(200).json({ message: `O estudante de cpf:${cpf} foi excluído com sucesso.` });
    } catch (error) {
        res.status(500).json({ message: `Não foi possivel excluir o estudante de cpf: ${cpf}` });
    }
}

return { 
    visualizarEstudantes: visualizarEstudantes, 
    criarEstudante: criarEstudante, 
    atualizarEstudante: atualizarEstudante, 
    excluirEstudante: excluirEstudante 
};

};

module.exports = estudantesController;