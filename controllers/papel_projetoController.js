// controllers/papel_projetoController.js
const papel_projetoModel = require('../models/papel_projetoModel');

async function listAll(req, res) {
  try {
    const registros = await papel_projetoModel.getAllpapel_projeto();
    res.render('consultas/papel_projeto', { dados: registros });
  } catch (error) {
    console.error('Erro ao buscar papéis do projeto:', error);
    res.render('error', { message: 'Erro ao buscar papéis do projeto', returnLink: '/logo' });
  }
}

async function filterByNome(req, res) {
  const { nome } = req.body;
  try {
    const registros = await papel_projetoModel.getpapel_projetoByNome(nome || '');
    res.render('consultas/papel_projeto', { dados: registros });
  } catch (error) {
    console.error('Erro ao filtrar papéis do projeto:', error);
    res.render('error', { message: 'Erro ao filtrar', returnLink: '/logo' });
  }
}

async function insert(req, res) {
  const { descricao } = req.body;
  try {
    await papel_projetoModel.insertpapel_projeto(descricao);
    res.redirect('/papel_projeto');
  } catch (error) {
    console.error('Erro ao inserir papel do projeto:', error);
    res.render('error', { message: 'Erro ao inserir', returnLink: '/logo' });
  }
}

async function getById(req, res) {
  const { id } = req.params;
  try {
    const registro = await papel_projetoModel.getpapel_projetoById(id);
    res.render('forms/papel_projeto', { papel_projeto: registro, isEdit: true });
  } catch (error) {
    console.error('Erro ao buscar papel do projeto:', error);
    res.render('error', { message: 'Erro ao buscar', returnLink: '/logo' });
  }
}

async function update(req, res) {
  const { id } = req.params;
  const { descricao } = req.body;
  try {
    await papel_projetoModel.updatepapel_projeto(id, descricao);
    res.redirect('/papel_projeto');
  } catch (error) {
    console.error('Erro ao editar papel do projeto:', error);
    res.render('error', { message: 'Erro ao editar', returnLink: '/papel_projeto' });
  }
}

async function deleteRecord(req, res) {
  const { id } = req.params;
  try {
    await papel_projetoModel.deletepapel_projeto(id);
    res.redirect('/papel_projeto');
  } catch (error) {
    console.error('Erro ao excluir papel do projeto:', error);
    res.render('error', { message: 'Erro ao excluir', returnLink: '/papel_projeto' });
  }
}

module.exports = { listAll, filterByNome, insert, getById, update, deleteRecord };
