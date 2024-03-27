const repoCursos = require('../repositories/repoCursos');

function cursosController() {

async function visualizarCursos(req, res) {
    try {
        const cursos = await repoCursos.visualizarCursos();
        res.status(200).json(cursos);
    } catch (error) {
        res.status(500).json({ message: "Não existem cursos registrados" });
    }
}

async function criarCurso(req, res) {
    const { nome } = req.body;
    console.log(nome);
    try {
        const curso = await repoCursos.criarCurso(nome);
        
        res.status(201).json({ message: `Foi criado com sucesso o curso de: ${curso.nome}` });
    } catch (error) {
        res.status(500).json({ message: "Não foi possivel registrar novo curso" });
    }
}

async function atualizarCurso(req, res) {
    const { id } = req.params;
    const { nome } = req.body;
    try {
        await repoCursos.atualizarCurso(id, nome);
        res.status(200).json({ message: `O curso ${nome} foi atualizado com sucesso.` });
    } catch (error) {
        res.status(500).json({ message: `Não foi possivel atualizar o curso ${nome}` });
    }
}

async function excluirCurso(req, res) {
    const { id } = req.params;
    try {
        await repoCursos.excluirCurso(id);
        res.status(200).json({ message: `O curso de id:${id} foi excluído com sucesso.` });
    } catch (error) {
        res.status(500).json({ message: `Não foi possivel excluir o curso de id: ${id}` });
    }
}

return { 
    visualizarCursos: visualizarCursos, 
    criarCurso: criarCurso, 
    atualizarCurso: atualizarCurso, 
    excluirCurso: excluirCurso 
};

};

module.exports = cursosController;