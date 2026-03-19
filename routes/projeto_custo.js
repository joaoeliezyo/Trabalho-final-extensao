// projeto_custo.js
const express = require('express');
const router = express.Router();
const projeto_custoController = require('../controllers/projeto_custoController');
const projeto_custoModel = require('../models/projeto_custoModel');

// Rota para listar todos os projeto_custo
router.get('/', projeto_custoController.listprojeto_custo);
// Rota para listar todos os projeto_custo
router.get('/filtro', (req, res) => {
 res.render('filtro');
 });
router.get('/forms/projeto_custo', (req, res) => {
 res.render('forms/projeto_custo', { projeto_custo: { Id: '', id_projeto: '', descricao: '', quantitativo: '', valor_unitario: '', justificativa: '', realizado: '', tipo: '' }, isEdit: false });
 });
router.get('/consultas/projeto_custo', async (req, res) => {
 try {
 const dados = await projeto_custoModel.getAllprojeto_custo();
 res.render('consultas/projeto_custo', { dados });
 } catch (error) {
 console.error('Erro ao carregar consulta de projeto_custo:', error);
 res.render('error', { message: 'Erro ao carregar consulta de projeto_custo', returnLink: '/welcome' });
 }
 });
// Rota para filtrar projeto_custo por nome
router.post('/filtro', projeto_custoController.filterprojeto_custo);
router.get('/cadastrar', (req, res) => {
 res.render('cadastrar');
 });
router.post('/cadastrar', projeto_custoController.addprojeto_custo);
router.get('/:id', projeto_custoController.showprojeto_custo);
// Rota para exibir página de edição de projeto_custo
router.get('/:id/edit', projeto_custoController.showEditForm); 

// Rota para lidar com ação de edição de projeto_custo
router.post('/:id/edit', projeto_custoController.editprojeto_custo);
// Rota para lidar com ação de exclusão de projeto_custo
router.post('/:id/delete', projeto_custoController.deleteprojeto_custo);
// Rota para exibir formulário de confirmação de exclusão
router.get('/:id/confirm-delete', projeto_custoController.showConfirmDeleteForm);
module.exports = router;