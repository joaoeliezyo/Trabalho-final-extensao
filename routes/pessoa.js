// pessoa.js  
const express = require('express');
const router = express.Router();
const pessoaController = require('../controllers/pessoaController');       
const pessoaModel = require('../models/pessoaModel');     
const pool = require('../db');

async function carregarOpcoespessoa() {
  const [tipoPlanos] = await pool.query('SELECT id_tipo_plano, descricao FROM projetos_extensao.tipo_plano');
  const [coordenadores] = await pool.query(`SELECT pp.id_projeto, pp.id_pessoa
  FROM projetos_extensao.projeto_pessoa pp
  inner join projetos_extensao.pessoa p on p.id_pessoa = pp.id_pessoa
  where pp.id_papel = 1`);
  const [publicosAlvo] = await pool.query('SELECT id_publico_alvo, descricao FROM projetos_extensao.publico_alvo');
  const [tiposPessoa] = await pool.query('SELECT id_tipo_pessoa, descricao FROM projetos_extensao.tipo_pessoa');

  return { tipoPlanos, coordenadores, publicosAlvo, tiposPessoa };
}
// Rota para listar todos os pessoas
router.get('/', pessoaController.listpessoas);
// Rota para listar todos os pessoas   
router.get('/filtro', (req, res) => {
 res.render('filtro');
 });
router.get('/forms/pessoa', async (req, res) => {
 try {
  const opcoes = await carregarOpcoespessoa();
  res.render('forms/pessoa', { pessoa:
     {id_pessoa: '', nome: '', cpf: '', email: '', telefone: '', id_tipo_pessoa: '',}
  , isEdit: false, ...opcoes });
 } catch (error) {
  console.error('Erro ao carregar formulario de pessoa:', error);
  res.render('error', { message: 'Erro ao carregar formulario de pessoa', returnLink: '/pessoa' });
 }
 });

router.get('/consultas/pessoa', async (req, res) => {
 try {
 const dados = await pessoaModel.getAllpessoas();
 res.render('consultas/pessoa', { dados });
 } catch (error) {
 console.error('Erro ao carregar consulta de pessoa:', error);
 res.render('error', { message: 'Erro ao carregar consulta de pessoa', returnLink: '/logon' });
 }
 });

// Rota para filtrar pessoas por nome
router.post('/filtro', pessoaController.filterpessoas);
router.get('/cadastrar', (req, res) => {
 res.render('cadastrar');
 });

router.post('/cadastrar', pessoaController.addpessoas);

router.get('/:id', pessoaController.showpessoas);

// Rota para exibir página de edição de pessoa
router.get('/:id/edit', pessoaController.showEditForm); 

// Rota para lidar com ação de edição de pessoa
router.post('/:id/edit', pessoaController.editpessoas);

// Rota para lidar com ação de exclusão de pessoa
router.post('/:id/delete', pessoaController.deletepessoas);

// Rota para exibir formulário de confirmação de exclusão
router.get('/:id/confirm-delete', pessoaController.showConfirmDeleteForm);

module.exports = router; 
 