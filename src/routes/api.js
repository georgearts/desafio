const express = require("express");
const router = express.Router();
router.use(express.json()); // Middleware para interpretar o corpo da solicitação como JSON
const CursosController = require("../controllers/cursosController");
const cursosController = CursosController();
const EstudantesController = require("../controllers/estudantesController");
const estudantesController = EstudantesController();

//Rotas do API de Cursos
router.get('/cursos', cursosController.visualizarCursos);
router.post('/cursos', cursosController.criarCurso);
router.put('/cursos/:id', cursosController.atualizarCurso);
router.delete('/cursos/:id', cursosController.excluirCurso);

//Rotas de API de Estudantes

router.get('/estudantes', estudantesController.visualizarEstudantes);
router.post('/estudantes', estudantesController.criarEstudante);
router.put('/estudantes/:cpf', estudantesController.atualizarEstudante);
router.delete('/estudantes/:cpf', estudantesController.excluirEstudante);

module.exports = router;