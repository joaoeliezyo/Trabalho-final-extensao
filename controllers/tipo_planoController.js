// controllers/tipo_planoController.js
const tipo_planoModel = require('../models/tipo_planoModel');

async function listAll(req, res) {
  try {
    const registros = await tipo_planoModel.getAlltipo_plano();
    res.render('consultas/tipo_plano', { dados: registros });
  } catch (error) {
    console.error('Erro ao buscar tipos de plano:', error);
    res.render('error', { message: 'Erro ao buscar tipos de plano', returnLink: '/logo' });
  }
}

async function filterByNome(req, res) {
  const { nome } = req.body;
  try {
    const registros = await tipo_planoModel.gettipo_planoByNome(nome || '');
    res.render('consultas/tipo_plano', { dados: registros });
  } catch (error) {
    console.error('Erro ao filtrar tipos de plano:', error);
    res.render('error', { message: 'Erro ao filtrar', returnLink: '/logo' });
  }
}

async function insert(req, res) {
  const { descricao } = req.body;
  try {
    await tipo_planoModel.inserttipo_plano(descricao);
    res.redirect('/tipo_plano');
  } catch (error) {
    console.error('Erro ao inserir tipo de plano:', error);
    res.render('error', { message: 'Erro ao inserir', returnLink: '/logo' });
  }
}

async function getById(req, res) {
  const { id } = req.params;
  try {
    const registro = await tipo_planoModel.gettipo_planoById(id);
    res.render('forms/tipo_plano', { tipo_plano: registro, isEdit: true });
  } catch (error) {
    console.error('Erro ao buscar tipo de plano:', error);
    res.render('error', { message: 'Erro ao buscar', returnLink: '/logo' });
  }
}

async function update(req, res) {
  const { id } = req.params;
  const { descricao } = req.body;
  try {
    await tipo_planoModel.updatetipo_plano(id, descricao);
    res.redirect('/tipo_plano');
  } catch (error) {
    console.error('Erro ao editar tipo de plano:', error);
    res.render('error', { message: 'Erro ao editar', returnLink: '/tipo_plano' });
  }
}

async function deleteRecord(req, res) {
  const { id } = req.params;
  try {
    await tipo_planoModel.deletetipo_plano(id);
    res.redirect('/tipo_plano');
  } catch (error) {
    console.error('Erro ao excluir tipo de plano:', error);
    res.render('error', { message: 'Erro ao excluir', returnLink: '/tipo_plano' });
  }
}

module.exports = { listAll, filterByNome, insert, getById, update, deleteRecord };
