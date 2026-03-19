// controllers/tipo_instituicaoController.js
const tipo_instituicaoModel = require('../models/tipo_instituicaoModel');

async function listAll(req, res) {
  try {
    const registros = await tipo_instituicaoModel.getAlltipo_instituicao();
    res.render('consultas/tipo_instituicao', { dados: registros });
  } catch (error) {
    console.error('Erro ao buscar tipos de instituição:', error);
    res.render('error', { message: 'Erro ao buscar tipos de instituição', returnLink: '/logo' });
  }
}

async function filterByNome(req, res) {
  const { nome } = req.body;
  try {
    const registros = await tipo_instituicaoModel.gettipo_instituicaoByNome(nome || '');
    if (!registros || registros.length === 0) {
      res.render('consultas/tipo_instituicao', { dados: [] });
    } else {
      res.render('consultas/tipo_instituicao', { dados: registros });
    }
  } catch (error) {
    console.error('Erro ao filtrar tipos de instituição:', error);
    res.render('error', { message: 'Erro ao filtrar', returnLink: '/logo' });
  }
}

async function insert(req, res) {
  const { descricao } = req.body;
  try {
    await tipo_instituicaoModel.inserttipo_instituicao(descricao);
    res.redirect('/tipo_instituicao');
  } catch (error) {
    console.error('Erro ao inserir tipo de instituição:', error);
    res.render('error', { message: 'Erro ao inserir', returnLink: '/logo' });
  }
}

async function getById(req, res) {
  const { id } = req.params;
  try {
    const registro = await tipo_instituicaoModel.gettipo_instituicaoById(id);
    res.render('forms/tipo_instituicao', { tipo_instituicao: registro, isEdit: true });
  } catch (error) {
    console.error('Erro ao buscar tipo de instituição:', error);
    res.render('error', { message: 'Erro ao buscar', returnLink: '/logo' });
  }
}

async function update(req, res) {
  const { id } = req.params;
  const { descricao } = req.body;
  try {
    await tipo_instituicaoModel.updatetipo_instituicao(id, descricao);
    res.redirect('/tipo_instituicao');
  } catch (error) {
    console.error('Erro ao editar tipo de instituição:', error);
    res.render('error', { message: 'Erro ao editar', returnLink: '/tipo_instituicao' });
  }
}

async function deleteRecord(req, res) {
  const { id } = req.params;
  try {
    await tipo_instituicaoModel.deletetipo_instituicao(id);
    res.redirect('/tipo_instituicao');
  } catch (error) {
    console.error('Erro ao excluir tipo de instituição:', error);
    res.render('error', { message: 'Erro ao excluir', returnLink: '/tipo_instituicao' });
  }
}

module.exports = { listAll, filterByNome, insert, getById, update, deleteRecord };
