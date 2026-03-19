// controllers/local_execucaoController.js
const local_execucaoModel = require('../models/local_execucaoModel');

async function listAll(req, res) {
  try {
    const registros = await local_execucaoModel.getAlllocal_execucao();
    res.render('consultas/local_execucao', { dados: registros });
  } catch (error) {
    console.error('Erro ao buscar locais de execução:', error);
    res.render('error', { message: 'Erro ao buscar locais de execução', returnLink: '/logo' });
  }
}

async function filterByNome(req, res) {
  const { nome } = req.body;
  try {
    const registros = await local_execucaoModel.getlocal_execucaoByNome(nome || '');
    res.render('consultas/local_execucao', { dados: registros });
  } catch (error) {
    console.error('Erro ao filtrar locais de execução:', error);
    res.render('error', { message: 'Erro ao filtrar', returnLink: '/logo' });
  }
}

async function insert(req, res) {
  const { endereco, cep, bairro, cidade } = req.body;
  try {
    await local_execucaoModel.insertlocal_execucao(endereco, cep, bairro, cidade);
    res.redirect('/local_execucao');
  } catch (error) {
    console.error('Erro ao inserir local de execução:', error);
    res.render('error', { message: 'Erro ao inserir', returnLink: '/logo' });
  }
}

async function getById(req, res) {
  const { id } = req.params;
  try {
    const registro = await local_execucaoModel.getlocal_execucaoById(id);
    res.render('forms/local_execucao', { local_execucao: registro, isEdit: true });
  } catch (error) {
    console.error('Erro ao buscar local de execução:', error);
    res.render('error', { message: 'Erro ao buscar', returnLink: '/logo' });
  }
}

async function update(req, res) {
  const { id } = req.params;
  const { endereco, cep, bairro, cidade } = req.body;
  try {
    await local_execucaoModel.updatelocal_execucao(id, endereco, cep, bairro, cidade);
    res.redirect('/local_execucao');
  } catch (error) {
    console.error('Erro ao editar local de execução:', error);
    res.render('error', { message: 'Erro ao editar', returnLink: '/local_execucao' });
  }
}

async function deleteRecord(req, res) {
  const { id } = req.params;
  try {
    await local_execucaoModel.deletelocal_execucao(id);
    res.redirect('/local_execucao');
  } catch (error) {
    console.error('Erro ao excluir local de execução:', error);
    res.render('error', { message: 'Erro ao excluir', returnLink: '/local_execucao' });
  }
}

module.exports = { listAll, filterByNome, insert, getById, update, deleteRecord };
