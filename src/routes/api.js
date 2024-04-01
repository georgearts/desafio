const express = require("express");
const router = express.Router();
router.use(express.json()); // Middleware para interpretar o corpo da solicitação como JSON
const CursosController = require("../controllers/cursosController");
const cursosController = CursosController();
const EstudantesController = require("../controllers/estudantesController");
const estudantesController = EstudantesController();
const TarefasController = require("../controllers/tarefasController");
const tarefasController = TarefasController();
const AtividadesController = require("../controllers/atividadesController");
const atividadesController = AtividadesController();

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

//Rotas de API de Tarefas
router.get('/tarefas', tarefasController.visualizarTarefas);
router.post('/tarefas', tarefasController.criarTarefa);
router.put('/tarefas/:id', tarefasController.atualizarTarefa);
router.delete('/tarefas/:id', tarefasController.excluirTarefa);

//Rotas de API de Atividades
router.get('/atividades', atividadesController.visualizarAtividades);
router.post('/atividades', atividadesController.criarAtividade);
router.put('/atividades/:id', atividadesController.atualizarAtividade);
router.delete('/atividades/:id', atividadesController.excluirAtividade);    
router.post('/atividades/iniciar', atividadesController.iniciarAtividade);
router.post('/atividades/finalizar', atividadesController.finalizarAtividade);

module.exports = router;