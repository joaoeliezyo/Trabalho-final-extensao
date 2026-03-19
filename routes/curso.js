// curso.js
const express = require('express');
const router = express.Router();
const cursoController = require('../controllers/cursoController');
const cursoModel = require('../models/cursoModel');
// Rota para listar todos os cursosn
router.get('/', cursoController.listcursos);
// Rota para listar todos os cursos
router.get('/filtro', (req, res) => {
 res.render('filtro');
 });
router.get('/forms/curso', (req, res) => {
 res.render('forms/curso', { curso: { id_curso: '', nome_curso: '' }, isEdit: false });
 });
router.get('/consultas/curso', async (req, res) => {
 try {
 const dados = await cursoModel.getAllCursos();
 res.render('consultas/curso', { dados });
 } catch (error) {
 console.error('Erro ao carregar consulta de cursos:', error);
 res.render('error', { message: 'Erro ao carregar consulta de cursos', returnLink: '/welcome' });
 }
 });
// Rota para filtrar cursos por nome
router.post('/filtro', cursoController.filtercurso);
router.get('/cadastrar', (req, res) => {
 res.render('cadastrar');
 });
router.post('/cadastrar', cursoController.addcurso);
router.get('/:id', cursoController.showcurso);
// Rota para exibir página de edição de curso
router.get('/:id/edit', cursoController.showEditForm); 

// Rota para lidar com ação de edição de curso
router.post('/:id/edit', cursoController.editcurso);
// Rota para lidar com ação de exclusão de curso
router.post('/:id/delete', cursoController.deletecurso);
// Rota para exibir formulário de confirmação de exclusão
router.get('/:id/confirm-delete', cursoController.showConfirmDeleteForm);
module.exports = router; 
