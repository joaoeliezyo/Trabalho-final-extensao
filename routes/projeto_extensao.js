// projeto_extensao.js  
const express = require('express');
const router = express.Router();
const projeto_extensaoController = require('../controllers/projeto_extensaoController');       
const projeto_extensaoModel = require('../models/projeto_extensaoModel');     
const pool = require('../db');

async function carregarOpcoesProjetoExtensao() {
 const [tipoPlanos] = await pool.query('SELECT id_tipo_plano, descricao FROM projetos_extensao.tipo_plano');
 const [coordenadores] = await pool.query(`SELECT pp.id_projeto, pp.id_pessoa
 FROM projetos_extensao.projeto_pessoa pp
 inner join projetos_extensao.pessoa p on p.id_pessoa = pp.id_pessoa
 where pp.id_papel = 1`);
 const [publicosAlvo] = await pool.query('SELECT id_publico_alvo, descricao FROM projetos_extensao.publico_alvo');

 return { tipoPlanos, coordenadores, publicosAlvo };
}
// Rota para listar todos os projeto_extensao
router.get('/', projeto_extensaoController.listprojeto_extensaos);
// Rota para listar todos os projeto_extensao   
router.get('/filtro', (req, res) => {
 res.render('filtro');
 });
router.get('/forms/projeto_extensao', async (req, res) => {
 try {
  const opcoes = await carregarOpcoesProjetoExtensao();
  res.render('forms/projeto_extensao', { projeto_extensao:
     {id_projeto: '', titulo: '', id_tipo_plano: '', coordenador_id: '', periodo_inicio: '', periodo_fim: '',carga_horaria_total: '', id_publico_alvo: '',}
  , isEdit: false, ...opcoes });
 } catch (error) {
  console.error('Erro ao carregar formulario de projeto_extensao:', error);
  res.render('error', { message: 'Erro ao carregar formulario de projeto_extensao', returnLink: '/projeto_extensao' });
 }
 });

router.get('/consultas/projeto_extensao', async (req, res) => {
 try {
 const dados = await projeto_extensaoModel.getAllprojeto_extensaos();
 res.render('consultas/projeto_extensao', { dados });
 } catch (error) {
 console.error('Erro ao carregar consulta de projeto_extensao:', error);
 res.render('error', { message: 'Erro ao carregar consulta de projeto_extensao', returnLink: '/logon' });
 }
 });

// Rota para filtrar projeto_extensaos por nome
router.post('/filtro', projeto_extensaoController.filterprojeto_extensao);
router.get('/cadastrar', (req, res) => {
 res.render('cadastrar');
 });

router.post('/cadastrar', projeto_extensaoController.addprojeto_extensao);

router.get('/:id', projeto_extensaoController.showprojeto_extensao);

// Rota para exibir página de edição de projeto_extensao
router.get('/:id/edit', projeto_extensaoController.showEditForm); 

// Rota para lidar com ação de edição de projeto_extensao
router.post('/:id/edit', projeto_extensaoController.editprojeto_extensao);

// Rota para lidar com ação de exclusão de projeto_extensao
router.post('/:id/delete', projeto_extensaoController.deleteprojeto_extensao);

// Rota para exibir formulário de confirmação de exclusão
router.get('/:id/confirm-delete', projeto_extensaoController.showConfirmDeleteForm);

module.exports = router; 
