// avaliacao_institucional.js
const express = require('express');
const router = express.Router();
const avaliacao_institucionalController = require('../controllers/avaliacao_institucionalController');
const avaliacao_institucionalModel = require('../models/avaliacao_institucionalModel');

// Rota para listar todos os avaliacao_institucional
router.get('/', avaliacao_institucionalController.listavaliacao_institucionals);
// Rota para listar todos os avaliacao_institucional
router.get('/filtro', (req, res) => {
 res.render('filtro');
 });
router.get('/forms/avaliacao_institucional', (req, res) => {
 res.render('forms/avaliacao_institucional', { avaliacao_institucional: { id_avaliacao_institucional: '', nome_avaliacao_institucional: '' }, isEdit: false });
 });
router.get('/consultas/avaliacao_institucional', avaliacao_institucionalController.listavaliacao_institucionals);
// Rota para filtrar avaliacao_institucional por nome
router.post('/filtro', avaliacao_institucionalController.filteravaliacao_institucional);
router.get('/cadastrar', (req, res) => {
 res.render('cadastrar');
 });
router.post('/cadastrar', avaliacao_institucionalController.addavaliacao_institucional);
router.get('/:id', avaliacao_institucionalController.showavaliacao_institucional);
// Rota para exibir página de edição de avaliacao_institucional
router.get('/:id/edit', avaliacao_institucionalController.showEditForm); 

// Rota para lidar com ação de edição de avaliacao_institucional
router.post('/:id/edit', avaliacao_institucionalController.editavaliacao_institucional);
// Rota para lidar com ação de exclusão de avaliacao_institucional
router.post('/:id/delete', avaliacao_institucionalController.deleteavaliacao_institucional);
// Rota para exibir formulário de confirmação de exclusão
router.get('/:id/confirm-delete', avaliacao_institucionalController.showConfirmDeleteForm);
module.exports = router; 

