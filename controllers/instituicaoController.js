// controllers/instituicaoController.js
const instituicaoModel = require('../models/instituicaoModel');
const tipo_instituicaoModel = require('../models/tipo_instituicaoModel');

async function listAll(req, res) {
  try {
    const registros = await instituicaoModel.getAllInstituicao();
    res.render('consultas/instituicao', { dados: registros });
  } catch (error) {
    console.error('Erro ao buscar instituições:', error);
    res.render('error', { message: 'Erro ao buscar instituições', returnLink: '/logo' });
  }
}

async function filterByNome(req, res) {
  const { nome } = req.body;
  try {
    const registros = await instituicaoModel.getInstituicaoByNome(nome || '');
    res.render('consultas/instituicao', { dados: registros });
  } catch (error) {
    console.error('Erro ao filtrar instituições:', error);
    res.render('error', { message: 'Erro ao filtrar', returnLink: '/logo' });
  }
}

async function formPage(req, res) {
  try {
    const tipos = await tipo_instituicaoModel.getAlltipo_instituicao();
    res.render('forms/instituicao', { instituicao: { id_instituicao: '', nome: '', sigla: '', fk_tipo_instituicao: '' }, tipos: tipos, isEdit: false });
  } catch (error) {
    res.render('error', { message: 'Erro ao carregar formulário', returnLink: '/logo' });
  }
}

async function insert(req, res) {
  const { nome, sigla, fk_tipo_instituicao } = req.body;
  try {
    await instituicaoModel.insertInstituicao(nome, sigla, fk_tipo_instituicao);
    res.redirect('/instituicao');
  } catch (error) {
    console.error('Erro ao inserir instituição:', error);
    res.render('error', { message: 'Erro ao inserir', returnLink: '/logo' });
  }
}

async function getById(req, res) {
  const { id } = req.params;
  try {
    const registro = await instituicaoModel.getInstituicaoById(id);
    const tipos = await tipo_instituicaoModel.getAlltipo_instituicao();
    res.render('forms/instituicao', { instituicao: registro, tipos: tipos, isEdit: true });
  } catch (error) {
    console.error('Erro ao buscar instituição:', error);
    res.render('error', { message: 'Erro ao buscar', returnLink: '/logo' });
  }
}

async function update(req, res) {
  const { id } = req.params;
  const { nome, sigla, fk_tipo_instituicao } = req.body;
  try {
    await instituicaoModel.updateInstituicao(id, nome, sigla, fk_tipo_instituicao);
    res.redirect('/instituicao');
  } catch (error) {
    console.error('Erro ao editar instituição:', error);
    res.render('error', { message: 'Erro ao editar', returnLink: '/instituicao' });
  }
}

async function deleteRecord(req, res) {
  const { id } = req.params;
  try {
    await instituicaoModel.deleteInstituicao(id);
    res.redirect('/instituicao');
  } catch (error) {
    console.error('Erro ao excluir instituição:', error);
    res.render('error', { message: 'Erro ao excluir', returnLink: '/instituicao' });
  }
}

module.exports = { listAll, filterByNome, formPage, insert, getById, update, deleteRecord };
