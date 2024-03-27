const { Cursos } = require('../models/Cursos');
const Sequelize = require('sequelize');

function visualizarCursos() {
    return Cursos.findAll();
  }
  
  async function criarCurso(nome) {
    console.log(`${nome} chegou`);
    const existingCurso = await Cursos.findOne({ where: { nome } });
    if (existingCurso) {
      throw new Error('Curso já existe');
    }
    const curso = await Cursos.create({
      nome: nome,
    });

    console.log(`Curso ${nome} criado com sucesso`);
    return curso;
  }
  
  async function atualizarCurso(id, nome) {
    const existingCurso = await Cursos.findOne({ where: { nome, id: { [Sequelize.Op.ne]: id } } });
    if (existingCurso) {
      throw new Error('Curso já existe');
    }
  
    return Cursos.update(
      {
        nome: nome,
      },
      {
        where: {
          id: id
        }
      }
    );
  }
  
  function excluirCurso(id) {
    return Cursos.destroy({
      where: {
        id: id
      }
    });
  }

  async function buscarCurso(req, res) {
    const { id } = req.params;
    try {
      const curso = await repoCursos.buscarCursoPorId(id);
      if (!curso) {
        return res.status(404).json({ message: 'Curso não encontrado' });
      }
      res.status(200).json(curso);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
 
  async function buscarCursoPorNome(nomeCurso) {
    const nome = nomeCurso;
    const curso = await Cursos.findOne({ where: { nome } });
    return curso ? curso.id : null;
  }
  
  const repoCursos = { visualizarCursos, criarCurso, atualizarCurso, excluirCurso, buscarCurso, buscarCursoPorNome };

   module.exports = repoCursos;