// avaliacao_institucionalController.js
const avaliacao_institucionalModel = require('../models/avaliacao_institucionalModel');

async function listavaliacao_institucionals(req, res) {
 try {
 const avaliacao_institucionals = await avaliacao_institucionalModel.getAllavaliacao_institucionals();
 res.render('consultas/avaliacao_institucional', { dados: avaliacao_institucionals });
 } catch (error) {
 console.error('Erro ao buscar avaliacao_institucionals:', error);
 res.render('error', { message: 'Erro ao buscar avaliacao_institucionals', returnLink: '/logo' });
 }
}

async function filteravaliacao_institucional(req, res) {
 const { nome } = req.body;
 try {
 const avaliacao_institucionals = await avaliacao_institucionalModel.getavaliacao_institucionalByNome(nome || '');
 if (!avaliacao_institucionals || avaliacao_institucionals.length === 0) {
 res.render('consultas/avaliacao_institucional', { dados: [] });
 return;
 }
 res.render('consultas/avaliacao_institucional', { dados: avaliacao_institucionals });
 } catch (error) {
 console.error('Erro ao filtrar avaliacao_institucional:', error);
 res.render('error', { message: 'Erro ao filtrar avaliacao_institucional', returnLink: '/logo' });
 }
}

async function addavaliacao_institucional(req, res) {
 const { nome_avaliacao_institucional } = req.body;
 try {
 await avaliacao_institucionalModel.insertavaliacao_institucional(nome_avaliacao_institucional);
 res.redirect('/avaliacao_institucional');
 } catch (error) {
 console.error('Erro ao inserir avaliacao_institucional:', error);
 res.render('error', { message: 'Erro ao inserir avaliacao_institucional', returnLink: '/logo' });
 }
}

async function showavaliacao_institucional(req, res) {
 const id = req.params.id;
 try {
 const avaliacao_institucional = await avaliacao_institucionalModel.getavaliacao_institucionalById(id);
 if (!avaliacao_institucional) {
 res.status(404).send('avaliacao_institucional não encontrado');
 return;
 }
 res.render('consultas/avaliacao_institucional', { dados: [avaliacao_institucional] });
 } catch (error) {
 console.error('Erro ao buscar avaliacao_institucional:', error);
 res.render('error', { message: 'Erro ao buscar avaliacao_institucional', returnLink: '/logo' });
 }
}

async function showEditForm(req, res) {
 const id = req.params.id;
 try {
 const avaliacao_institucional = await avaliacao_institucionalModel.getavaliacao_institucionalById(id);
 if (!avaliacao_institucional) {
 res.status(404).send('avaliacao_institucional não encontrado');
 return;
 }
 res.render('forms/avaliacao_institucional', { avaliacao_institucional, isEdit: true });
 } catch (error) {
 console.error('Erro ao carregar avaliacao_institucional para edição:', error);
 res.render('error', { message: 'Erro ao carregar avaliacao_institucional para edição', returnLink: '/avaliacao_institucional' });
 }
}

async function editavaliacao_institucional(req, res) {
 const id = req.params.id;
 const { nome_avaliacao_institucional } = req.body;
 try {
 await avaliacao_institucionalModel.updateavaliacao_institucional(id, nome_avaliacao_institucional);
 res.redirect('/avaliacao_institucional');
 } catch (error) {
 console.error('Erro ao editar avaliacao_institucional:', error);
 res.render('error', { message: 'Erro ao editar avaliacao_institucional', returnLink: '/avaliacao_institucional' });
 }
}

async function showConfirmDeleteForm(req, res) {
 const id = req.params.id;
 try {
 const avaliacao_institucional = await avaliacao_institucionalModel.getavaliacao_institucionalById(id);
 if (!avaliacao_institucional) {
 res.status(404).send('avaliacao_institucional não encontrado');
 return;
 }
 res.render('confirmDelete', { avaliacao_institucional });
 } catch (error) {
 console.error('Erro ao carregar confirmação de exclusão:', error);
 res.render('error', { message: 'Erro ao carregar confirmação de exclusão', returnLink: '/avaliacao_institucional' });
 }
}

async function deleteavaliacao_institucional(req, res) {
 const id = req.params.id;
 try {
 await avaliacao_institucionalModel.deleteavaliacao_institucional(id);
 res.redirect('/avaliacao_institucional');
 } catch (error) {
 console.error('Erro ao excluir avaliacao_institucional:', error);
 res.render('error', { message: 'Erro ao excluir avaliacao_institucional', returnLink: '/avaliacao_institucional' });
 }
}

module.exports = {
 listavaliacao_institucionals,
 filteravaliacao_institucional,
 addavaliacao_institucional,
 showavaliacao_institucional,
 showEditForm,
 editavaliacao_institucional,
 showConfirmDeleteForm,
 deleteavaliacao_institucional
};
