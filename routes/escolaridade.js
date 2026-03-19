// escolaridade.js
const express = require('express');
const router = express.Router();
const escolaridadeController = require('../controllers/escolaridadeController');   
const escolaridadeModel = require('../models/escolaridadeModel');
// Rota para listar todos os Escolaridade   
router.get('/', escolaridadeController.listescolaridade);
// Rota para listar todos os Escolaridade
router.get('/filtro', (req, res) => {
 res.render('filtro');
 });
router.get('/forms/escolaridade', (req, res) => {
 res.render('forms/escolaridade', { faixaetaria: { id_faixaetaria: '', nome_faixaetaria: '' }, isEdit: false });
 });
router.get('/consultas/escolaridade', async (req, res) => {    
 try {
 const dados = await escolaridadeModel.getAllescolaridade();
 res.render('consultas/escolaridade', { dados });
 } catch (error) {
 console.error('Erro ao carregar consulta de escolaridade:', error);
 res.render('error', { message: 'Erro ao carregar consulta de escolaridade', returnLink: '/logo' });
 }
 });
// Rota para filtrar Escolaridade por nome
router.post('/filtro', escolaridadeController.filterescolaridade);
router.get('/cadastrar', (req, res) => {
 res.render('cadastrar');
 });
router.post('/cadastrar', escolaridadeController.addescolaridade);
router.get('/:id', escolaridadeController.showescolaridade);
// Rota para exibir página de edição de escolaridade
router.get('/:id/edit', escolaridadeController.showEditForm); 

// Rota para lidar com ação de edição de escolaridade
router.post('/:id/edit', escolaridadeController.editescolaridade);
// Rota para lidar com ação de exclusão de escolaridade
router.post('/:id/delete', escolaridadeController.deleteescolaridade);
// Rota para exibir formulário de confirmação de exclusão
router.get('/:id/confirm-delete', escolaridadeController.showConfirmDeleteForm);
module.exports = router; 
