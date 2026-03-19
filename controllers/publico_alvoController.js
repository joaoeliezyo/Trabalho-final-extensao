// controllers/publico_alvoController.js
const publico_alvoModel = require('../models/publico_alvoModel');

async function listAll(req, res) {
  try {
    const registros = await publico_alvoModel.getAllpublico_alvo();
    res.render('consultas/publico_alvo', { dados: registros });
  } catch (error) {
    console.error('Erro ao buscar públicos-alvo:', error);
    res.render('error', { message: 'Erro ao buscar públicos-alvo', returnLink: '/logo' });
  }
}

async function filterByNome(req, res) {
  const { nome } = req.body;
  try {
    const registros = await publico_alvoModel.getpublico_alvoByNome(nome || '');
    res.render('consultas/publico_alvo', { dados: registros });
  } catch (error) {
    console.error('Erro ao filtrar públicos-alvo:', error);
    res.render('error', { message: 'Erro ao filtrar', returnLink: '/logo' });
  }
}

async function insert(req, res) {
  const { descricao } = req.body;
  try {
    await publico_alvoModel.insertpublico_alvo(descricao);
    res.redirect('/publico_alvo');
  } catch (error) {
    console.error('Erro ao inserir público-alvo:', error);
    res.render('error', { message: 'Erro ao inserir', returnLink: '/logo' });
  }
}

async function getById(req, res) {
  const { id } = req.params;
  try {
    const registro = await publico_alvoModel.getpublico_alvoById(id);
    res.render('forms/publico_alvo', { publico_alvo: registro, isEdit: true });
  } catch (error) {
    console.error('Erro ao buscar público-alvo:', error);
    res.render('error', { message: 'Erro ao buscar', returnLink: '/logo' });
  }
}

async function update(req, res) {
  const { id } = req.params;
  const { descricao } = req.body;
  try {
    await publico_alvoModel.updatepublico_alvo(id, descricao);
    res.redirect('/publico_alvo');
  } catch (error) {
    console.error('Erro ao editar público-alvo:', error);
    res.render('error', { message: 'Erro ao editar', returnLink: '/publico_alvo' });
  }
}

async function deleteRecord(req, res) {
  const { id } = req.params;
  try {
    await publico_alvoModel.deletepublico_alvo(id);
    res.redirect('/publico_alvo');
  } catch (error) {
    console.error('Erro ao excluir público-alvo:', error);
    res.render('error', { message: 'Erro ao excluir', returnLink: '/publico_alvo' });
  }
}

module.exports = { listAll, filterByNome, insert, getById, update, deleteRecord };
