const { Estudantes } = require('../models/Estudantes');
const Sequelize = require('sequelize');

function visualizarEstudantes() {
    return Estudantes.findAll();
}

async function criarEstudante({ cpf, nome, cursoId, matricula }) {
    const curso = cursoId;
    const existingEstudante = await Estudantes.findOne({ where: { cpf } });
    if (existingEstudante) {
        throw new Error('Estudante já existe');
    }
    const estudante = await Estudantes.create({
        cpf: cpf,
        nome: nome,
        curso: curso,
        matricula: matricula
    });

    console.log(`Estudante ${nome} criado com sucesso`);
    return estudante;
}

async function atualizarEstudante(cpf, nome, curso, matricula) {
    const existingEstudante = await Estudantes.findOne({ where: { cpf: { [Sequelize.Op.ne]: cpf } } });
    if (existingEstudante) {
        throw new Error('Estudante já existe');
    }

    const estudante = await Estudantes.update(
        {
            nome: nome,
            curso: curso,
            matricula: matricula
        },
        {
            where: {
                cpf: cpf
            }
        }
    );
    
    console.log(`Estudante ${nome} atualizado com sucesso`);
    return estudante;
}

function excluirEstudante(cpf) {
    return Estudantes.destroy({
        where: {
            cpf: cpf
        }
    });
}

async function buscarEstudante(req, res) {
    const { cpf } = req.params;
    try {
        const estudante = await Estudantes.findOne({ where: { cpf } });
        if (!estudante) {
            return res.status(404).json({ message: 'Estudante não encontrado' });
        }
        res.status(200).json(estudante);
    } catch (error) {
        res.status(500).json({ message: "Erro ao executar essa função" });
    }
}

const repoEstudantes = { visualizarEstudantes, criarEstudante, atualizarEstudante, excluirEstudante, buscarEstudante };

module.exports = repoEstudantes;