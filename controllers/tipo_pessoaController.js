// tipo_pessoaController.js
const tipo_pessoaModel = require('../models/tipo_pessoaModel');

async function listtipo_pessoa(req, res) {
 try {
 const tipo_pessoa = await tipo_pessoaModel.getAlltipo_pessoa();
 res.render('consultas/tipo_pessoa', { dados: tipo_pessoa });
 } catch (error) {
 console.error('Erro ao buscar cursos:', error);
 res.render('error', { message: 'Erro ao buscar cursos', returnLink: '/welcome' });
 }
}

async function filtertipo_pessoa(req, res) {
 const { nome } = req.body;
 try {
 const tipo_pessoa = await tipo_pessoaModel.gettipo_pessoaByNome(nome || '');
 if (!tipo_pessoa || tipo_pessoa.length === 0) {
 res.render('consultas/tipo_pessoa', { dados: [] });
 return;
 }
 res.render('consultas/tipo_pessoa', { dados: tipo_pessoa });
 } catch (error) {
 console.error('Erro ao filtrar curso:', error);
 res.render('error', { message: 'Erro ao filtrar curso', returnLink: '/welcome' });
 }
}

async function addtipo_pessoa(req, res) {
 const { descricao } = req.body;
 try {
 await tipo_pessoaModel.inserttipo_pessoa({ descricao });
 res.redirect('/tipo_pessoa');
 } catch (error) {
 console.error('Erro ao inserir curso:', error);
 res.render('error', { message: 'Erro ao inserir curso', returnLink: '/logo' });
 }
}

async function showtipo_pessoa(req, res) {
 const id = req.params.id;
 try {
 const tipo_pessoa = await tipo_pessoaModel.gettipo_pessoaById(id);
 if (!tipo_pessoa) {
 res.status(404).send('tipo_pessoa não encontrado');
 return;
 }
 res.render('consultas/tipo_pessoa', { dados: [tipo_pessoa] });
 } catch (error) {
 console.error('Erro ao buscar tipo_pessoa:', error);
 res.render('error', { message: 'Erro ao buscar tipo_pessoa', returnLink: '/welcome' });
 }
}

async function showEditFormtipo_pessoa(req, res) {
 const id = req.params.id;
 try {
 const tipo_pessoa = await tipo_pessoaModel.gettipo_pessoaById(id);
 if (!tipo_pessoa) {
 res.status(404).send('tipo_pessoa não encontrado');
 return;
 }
 res.render('forms/tipo_pessoa', { tipo_pessoa, isEdit: true });
 } catch (error) {
 console.error('Erro ao carregar curso para edição:', error);
 res.render('error', { message: 'Erro ao carregar tipo_pessoa para edição', returnLink: '/tipo_pessoa' });
 }
}

async function edittipo_pessoa(req, res) {
 const id = req.params.id;
 const { descricao } = req.body;
 try {
 await tipo_pessoaModel.updatetipo_pessoa(id, { descricao });
 res.redirect('/tipo_pessoa');
 } catch (error) {
 console.error('Erro ao editar curso:', error);
 res.render('error', { message: 'Erro ao editar tipo_pessoa', returnLink: '/tipo_pessoa' });
 }
}

async function showConfirmDeleteFormtipo_pessoa(req, res) {
 const id = req.params.id;
 try {
 const tipo_pessoa = await tipo_pessoaModel.gettipo_pessoaById(id);
 if (!tipo_pessoa) {
 res.status(404).send('tipo_pessoa não encontrado');
 return;
 }
 res.render('confirmDelete', { tipo_pessoa });
 } catch (error) {
 console.error('Erro ao carregar confirmação de exclusão:', error);
 res.render('error', { message: 'Erro ao carregar confirmação de exclusão', returnLink: '/tipo_pessoa' });
 }
}

async function deletetipo_pessoa(req, res) {
 const id = req.params.id;
 try {
 await tipo_pessoaModel.deletetipo_pessoa(id);
 res.redirect('/tipo_pessoa');
 } catch (error) {
 console.error('Erro ao excluir curso:', error);
 res.render('error', { message: 'Erro ao excluir tipo_pessoa', returnLink: '/tipo_pessoa' });
 }
}

module.exports = {
 listtipo_pessoa,
 filtertipo_pessoa,
 addtipo_pessoa,
 showtipo_pessoa,
 showEditFormtipo_pessoa,
 edittipo_pessoa,
 showConfirmDeleteFormtipo_pessoa,
 deletetipo_pessoa
};
