// routes/index.js
const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const cursoRouter = require('./curso'); 
const faixa_etariaRouter = require('./faixa_etaria');
const escolaridadeRouter = require('./escolaridade');
const tipo_pessoaRouter = require('./tipo_pessoa');
const avaliacao_institucionalRouter = require('./avaliacao_institucional');
const projeto_extensaoRouter = require('./projeto_extensao');
const pessoaRouter = require('./pessoa');
const tipo_instituicaoRouter = require('./tipo_instituicao');
const instituicaoRouter = require('./instituicao');
const tipo_planoRouter = require('./tipo_plano');
const publico_alvoRouter = require('./publico_alvo');
const tipo_acaoRouter = require('./tipo_acao');
const linha_programaticaRouter = require('./linha_programatica');
const papel_projetoRouter = require('./papel_projeto');
const local_execucaoRouter = require('./local_execucao');
//minha modificação adicionar os que estavão faltando 
//OBS: VERIFICAR SE FALTA MAIS ALGUM 
const projeto_assinaturaRouter = require ('./projeto_assinatura');
const projeto_custoRouter = require('./projeto_custo');

// Rota GET para exibir a página de login
router.get('/login', (req, res) => {
  res.render('login');
});

// Rota GET para o dashboard/logo
router.get('/logo', (req, res) => {
  if (!req.session || !req.session.usuario) {
    return res.redirect('/login');
  }
  res.render('dashboard', { 
    usuario: req.session.usuario,
    tipo: req.session.tipo 
  });
});

// Rota POST para processar o formulário de login
router.post('/login', usuarioController.login);

// Rota de logout
router.get('/logout', usuarioController.logout);

// Rota raiz redireciona para /logo
router.get('/', (req, res) => {
  if (!req.session || !req.session.usuario) {
    return res.redirect('/login');
  }
  res.redirect('/logo');
});

// Rotas de recursos
router.use('/curso', cursoRouter);
router.use('/faixa_etaria', faixa_etariaRouter);
router.use('/escolaridade', escolaridadeRouter);
router.use('/tipo_pessoa', tipo_pessoaRouter);
router.use('/avaliacao_institucional', avaliacao_institucionalRouter);
router.use('/projeto_extensao', projeto_extensaoRouter);
router.use('/pessoa', pessoaRouter);
router.use('/tipo_instituicao', tipo_instituicaoRouter);
router.use('/instituicao', instituicaoRouter);
router.use('/tipo_plano', tipo_planoRouter);
router.use('/publico_alvo', publico_alvoRouter);
router.use('/tipo_acao', tipo_acaoRouter);
router.use('/linha_programatica', linha_programaticaRouter);
router.use('/papel_projeto', papel_projetoRouter);
router.use('/local_execucao', local_execucaoRouter);
//minha modificação 
router.use('/projeto_assinatura', projeto_assinaturaRouter);
router.use('/projeto_custo', projeto_custoRouter);


module.exports = router;        