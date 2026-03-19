// faixa_etaria.js
const express = require('express');
const router = express.Router();
const faixa_etariaController = require('../controllers/faixa_etariaController');   
const faixa_etariaModel = require('../models/faixa_etariaModel');
// Rota para listar todos os cursosn
router.get('/', faixa_etariaController.listfaixaetaria);
// Rota para listar todos os cursos
router.get('/filtro', (req, res) => {
 res.render('filtro');
 });
router.get('/forms/faixa_etaria', (req, res) => {
 res.render('forms/faixa_etaria', { faixaetaria: { id_faixaetaria: '', nome_faixaetaria: '' }, isEdit: false });
 });
router.get('/consultas/faixa_etaria', async (req, res) => {    
 try {
 const dados = await faixa_etariaModel.getAllfaixa_etaria();
 res.render('consultas/faixa_etaria', { dados });
 } catch (error) {
 console.error('Erro ao carregar consulta de faixa etaria:', error);
 res.render('error', { message: 'Erro ao carregar consulta de faixa etaria', returnLink: '/welcome' });
 }
 });
// Rota para filtrar cursos por nome
router.post('/filtro', faixa_etariaController.filterfaixaetaria);
router.get('/cadastrar', (req, res) => {
 res.render('cadastrar');
 });
router.post('/cadastrar', faixa_etariaController.addfaixaetaria);
router.get('/:id', faixa_etariaController.showfaixaetaria);
// Rota para exibir página de edição de curso
router.get('/:id/edit', faixa_etariaController.showEditForm); 

// Rota para lidar com ação de edição de curso
router.post('/:id/edit', faixa_etariaController.editfaixaetaria);
// Rota para lidar com ação de exclusão de curso
router.post('/:id/delete', faixa_etariaController.deletefaixaetaria);
// Rota para exibir formulário de confirmação de exclusão
router.get('/:id/confirm-delete', faixa_etariaController.showConfirmDeleteForm);
module.exports = router; 
