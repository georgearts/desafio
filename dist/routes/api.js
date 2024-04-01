"use strict";

var express = require("express");
var router = express.Router();
router.use(express.json()); // Middleware para interpretar o corpo da solicitação como JSON
var CursosController = require("../controllers/cursosController");
var cursosController = CursosController();
var EstudantesController = require("../controllers/estudantesController");
var estudantesController = EstudantesController();
var TarefasController = require("../controllers/tarefasController");
var tarefasController = TarefasController();
var AtividadesController = require("../controllers/atividadesController");
var atividadesController = AtividadesController();

//Rotas do API de Cursos
router.get('/cursos', cursosController.visualizarCursos);
router.post('/cursos', cursosController.criarCurso);
router.put('/cursos/:id', cursosController.atualizarCurso);
router["delete"]('/cursos/:id', cursosController.excluirCurso);

//Rotas de API de Estudantes
router.get('/estudantes', estudantesController.visualizarEstudantes);
router.post('/estudantes', estudantesController.criarEstudante);
router.put('/estudantes/:cpf', estudantesController.atualizarEstudante);
router["delete"]('/estudantes/:cpf', estudantesController.excluirEstudante);

//Rotas de API de Tarefas
router.get('/tarefas', tarefasController.visualizarTarefas);
router.post('/tarefas', tarefasController.criarTarefa);
router.put('/tarefas/:id', tarefasController.atualizarTarefa);
router["delete"]('/tarefas/:id', tarefasController.excluirTarefa);

//Rotas de API de Atividades
router.get('/atividades', atividadesController.visualizarAtividades);
router.post('/atividades', atividadesController.criarAtividade);
router.put('/atividades/:id', atividadesController.atualizarAtividade);
router["delete"]('/atividades/:id', atividadesController.excluirAtividade);
router.post('/atividades/iniciar', atividadesController.iniciarAtividade);
router.post('/atividades/finalizar', atividadesController.finalizarAtividade);
module.exports = router;