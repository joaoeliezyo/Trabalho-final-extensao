// projeto_assinatura.js
const express = require('express');
const router = express.Router();
const projeto_assinaturaController = require('../controllers/projeto_assinaturaController');
const projeto_assinaturaModel = require('../models/projeto_assinaturaModel');

// Listagem geral
router.get('/', projeto_assinaturaController.listprojeto_assinatura);

// Filtro por nome (form simples)
router.get('/filtro', (req, res) => {
  res.render('filtro');
});

router.post('/filtro', projeto_assinaturaController.filterprojeto_assinatura);

// Formulario de cadastro manual (legacy)
router.get('/forms/projeto_assinatura', (req, res) => {
  res.render('forms/projeto_assinatura', {
    projeto_assinatura: { id_projeto_assinatura: '', nome_projeto_assinatura: '' },
    isEdit: false
  });
});

// Consulta geral
router.get('/consultas/projeto_assinatura', async (req, res) => {
  try {
    const dados = await projeto_assinaturaModel.getAllProjeto_assinatura();
    res.render('consultas/projeto_assinatura', { dados });
  } catch (error) {
    console.error('Erro ao carregar consulta de projeto_assinatura:', error);
    res.render('error', { message: 'Erro ao carregar consulta de projeto_assinatura', returnLink: '/welcome' });
  }
});

// Cadastro direto (legacy)
router.get('/cadastrar', (req, res) => {
  res.render('cadastrar');
});
router.post('/cadastrar', projeto_assinaturaController.addprojeto_assinatura);

// Fluxo de assinatura por projeto
router.get('/:id_projeto/assinar', projeto_assinaturaController.showAssinar);
router.post('/:id_projeto/assinar', projeto_assinaturaController.assinarProjeto);

// CRUD por id
router.get('/:id', projeto_assinaturaController.showprojeto_assinatura);
router.get('/:id/edit', projeto_assinaturaController.showEditForm);
router.post('/:id/edit', projeto_assinaturaController.editprojeto_assinatura);
router.post('/:id/delete', projeto_assinaturaController.deleteprojeto_assinatura);
router.get('/:id/confirm-delete', projeto_assinaturaController.showConfirmDeleteFormprojeto_assinatura);

module.exports = router;