// controllers/linha_programaticaController.js
const linha_programaticaModel = require('../models/linha_programaticaModel');

async function listAll(req, res) {
  try {
    const registros = await linha_programaticaModel.getAllinha_programatica();
    res.render('consultas/linha_programatica', { dados: registros });
  } catch (error) {
    console.error('Erro ao buscar linhas programáticas:', error);
    res.render('error', { message: 'Erro ao buscar linhas programáticas', returnLink: '/logo' });
  }
}

async function filterByNome(req, res) {
  const { nome } = req.body;
  try {
    const registros = await linha_programaticaModel.getlinha_programaticaByNome(nome || '');
    res.render('consultas/linha_programatica', { dados: registros });
  } catch (error) {
    console.error('Erro ao filtrar linhas programáticas:', error);
    res.render('error', { message: 'Erro ao filtrar', returnLink: '/logo' });
  }
}

async function insert(req, res) {
  const { nome } = req.body;
  try {
    await linha_programaticaModel.insertlinha_programatica(nome);
    res.redirect('/linha_programatica');
  } catch (error) {
    console.error('Erro ao inserir linha programática:', error);
    res.render('error', { message: 'Erro ao inserir', returnLink: '/logo' });
  }
}

async function getById(req, res) {
  const { id } = req.params;
  try {
    const registro = await linha_programaticaModel.getlinha_programaticaById(id);
    res.render('forms/linha_programatica', { linha_programatica: registro, isEdit: true });
  } catch (error) {
    console.error('Erro ao buscar linha programática:', error);
    res.render('error', { message: 'Erro ao buscar', returnLink: '/logo' });
  }
}

async function update(req, res) {
  const { id } = req.params;
  const { nome } = req.body;
  try {
    await linha_programaticaModel.updatelinha_programatica(id, nome);
    res.redirect('/linha_programatica');
  } catch (error) {
    console.error('Erro ao editar linha programática:', error);
    res.render('error', { message: 'Erro ao editar', returnLink: '/linha_programatica' });
  }
}

async function deleteRecord(req, res) {
  const { id } = req.params;
  try {
    await linha_programaticaModel.deletelinha_programatica(id);
    res.redirect('/linha_programatica');
  } catch (error) {
    console.error('Erro ao excluir linha programática:', error);
    res.render('error', { message: 'Erro ao excluir', returnLink: '/linha_programatica' });
  }
}

module.exports = { listAll, filterByNome, insert, getById, update, deleteRecord };
