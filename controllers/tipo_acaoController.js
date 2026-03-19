// controllers/tipo_acaoController.js
const tipo_acaoModel = require('../models/tipo_acaoModel');

async function listAll(req, res) {
  try {
    const registros = await tipo_acaoModel.getAlltipo_acao();
    res.render('consultas/tipo_acao', { dados: registros });
  } catch (error) {
    console.error('Erro ao buscar tipos de ação:', error);
    res.render('error', { message: 'Erro ao buscar tipos de ação', returnLink: '/logo' });
  }
}

async function filterByNome(req, res) {
  const { nome } = req.body;
  try {
    const registros = await tipo_acaoModel.gettipo_acaoByNome(nome || '');
    res.render('consultas/tipo_acao', { dados: registros });
  } catch (error) {
    console.error('Erro ao filtrar tipos de ação:', error);
    res.render('error', { message: 'Erro ao filtrar', returnLink: '/logo' });
  }
}

async function insert(req, res) {
  const { nome } = req.body;
  try {
    await tipo_acaoModel.inserttipo_acao(nome);
    res.redirect('/tipo_acao');
  } catch (error) {
    console.error('Erro ao inserir tipo de ação:', error);
    res.render('error', { message: 'Erro ao inserir', returnLink: '/logo' });
  }
}

async function getById(req, res) {
  const { id } = req.params;
  try {
    const registro = await tipo_acaoModel.gettipo_acaoById(id);
    res.render('forms/tipo_acao', { tipo_acao: registro, isEdit: true });
  } catch (error) {
    console.error('Erro ao buscar tipo de ação:', error);
    res.render('error', { message: 'Erro ao buscar', returnLink: '/logo' });
  }
}

async function update(req, res) {
  const { id } = req.params;
  const { nome } = req.body;
  try {
    await tipo_acaoModel.updatetipo_acao(id, nome);
    res.redirect('/tipo_acao');
  } catch (error) {
    console.error('Erro ao editar tipo de ação:', error);
    res.render('error', { message: 'Erro ao editar', returnLink: '/tipo_acao' });
  }
}

async function deleteRecord(req, res) {
  const { id } = req.params;
  try {
    await tipo_acaoModel.deletetipo_acao(id);
    res.redirect('/tipo_acao');
  } catch (error) {
    console.error('Erro ao excluir tipo de ação:', error);
    res.render('error', { message: 'Erro ao excluir', returnLink: '/tipo_acao' });
  }
}

module.exports = { listAll, filterByNome, insert, getById, update, deleteRecord };
