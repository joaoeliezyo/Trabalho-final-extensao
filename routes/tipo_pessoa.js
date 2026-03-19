// tipo_pessoa.js
const express = require('express');
const router = express.Router();
const tipo_pessoaController = require('../controllers/tipo_pessoaController');
const tipo_pessoaModel = require('../models/tipo_pessoaModel');
// Rota para listar todos os tipo_pessoa
router.get('/', tipo_pessoaController.listtipo_pessoa);
// Rota para listar todos os tipo_pessoa
router.get('/filtro', (req, res) => {
 res.render('filtro');
 });
router.get('/forms/tipo_pessoa', (req, res) => {
 res.render('forms/tipo_pessoa', { tipo_pessoa: { id_tipo_pessoa: '', nome_tipo_pessoa: '' }, isEdit: false });
 });
router.get('/consultas/tipo_pessoa', async (req, res) => {
 try {
 const dados = await tipo_pessoaModel.getAlltipo_pessoa();
 res.render('consultas/tipo_pessoa', { dados });
 } catch (error) {
 console.error('Erro ao carregar consulta de tipo_pessoa:', error);
 res.render('error', { message: 'Erro ao carregar consulta de tipo_pessoa', returnLink: '/welcome' });
 }
 });
// Rota para filtrar tipo_pessoa por nome
router.post('/filtro', tipo_pessoaController.filtertipo_pessoa);
router.get('/cadastrar', (req, res) => {
 res.render('cadastrar');
 });
router.post('/cadastrar', tipo_pessoaController.addtipo_pessoa);
router.get('/:id', tipo_pessoaController.showtipo_pessoa);
// Rota para exibir página de edição de tipo_pessoa

// router.get('/:id/edit', tipo_pessoaController.showEditFormtipo_pessoa);     

// Rota para lidar com ação de edição de tipo_pessoa
router.post('/:id/edit', tipo_pessoaController.edittipo_pessoa);
// Rota para lidar com ação de exclusão de tipo_pessoa
router.post('/:id/delete', tipo_pessoaController.deletetipo_pessoa);
// Rota para exibir formulário de confirmação de exclusão

// router.get('/:id/confirm-delete', tipo_pessoaController.showConfirmDeleteForm);
module.exports = router; 
