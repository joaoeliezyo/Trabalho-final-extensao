const escolaridadeModel = require('../models/escolaridadeModel');

async function listescolaridade(req, res) {
 try {
 const escolaridade = await escolaridadeModel.getAllescolaridade();
 res.render('consultas/escolaridade', { dados: escolaridade });
 } catch (error) {
 console.error('Erro ao buscar cursos:', error);
 res.render('error', { message: 'Erro ao buscar cursos', returnLink: '/logo' });
 }
}

async function filterescolaridade(req, res) {
 const { nome } = req.body;
 try {
 const escolaridade = await escolaridadeModel.getescolaridadeByNome(nome || '');
 if (!escolaridade || escolaridade.length === 0) {
 res.render('consultas/escolaridade', { dados: [] });
 return;
 }
 res.render('consultas/escolaridade', { dados: escolaridade });
 } catch (error) {
 console.error('Erro ao filtrar curso:', error);
 res.render('error', { message: 'Erro ao filtrar curso', returnLink: '/logo' });
 }
}

async function addescolaridade(req, res) {
 const { nome_escolaridade } = req.body;
 try {
 await escolaridadeModel.insertescolaridade(nome_escolaridade);
 res.redirect('/escolaridade');
 } catch (error) {
 console.error('Erro ao inserir escolaridade:', error);
 res.render('error', { message: 'Erro ao inserir escolaridade', returnLink: '/logo' });
 }
}

async function showescolaridade(req, res) {
 const id = req.params.id;
 try {
 const escolaridade = await escolaridadeModel.getescolaridadeById(id);
 if (!escolaridade) {
 res.status(404).send('escolaridade não encontrada');
 return;
 }
 res.render('consultas/escolaridade', { dados: [escolaridade] });
 } catch (error) {
 console.error('Erro ao buscar escolaridade:', error);
 res.render('error', { message: 'Erro ao buscar escolaridade', returnLink: '/logo' });
 }
}

async function showEditForm(req, res) {
 const id = req.params.id;
 try {
 const escolaridade = await escolaridadeModel.getescolaridadeById(id);
 if (!escolaridade) {
 res.status(404).send('escolaridade não encontrada');
 return;
 }
 res.render('forms/escolaridade', { escolaridade, isEdit: true });
 } catch (error) {
 console.error('Erro ao carregar escolaridade para edição:', error);
 res.render('error', { message: 'Erro ao carregar escolaridade para edição', returnLink: '/escolaridade' });
 }
}

async function editescolaridade(req, res) {
 const id = req.params.id;
 const { nome_escolaridade } = req.body;
 try {
 await escolaridadeModel.updateescolaridade(id, nome_escolaridade);
 res.redirect('/escolaridade');
 } catch (error) {
 console.error('Erro ao editar escolaridade:', error);
 res.render('error', { message: 'Erro ao editar escolaridade', returnLink: '/logo' });
 }
}

async function showConfirmDeleteForm(req, res) {
 const id = req.params.id;
 try {
 const escolaridade = await escolaridadeModel.getescolaridadeById(id);
 if (!escolaridade) {
 res.status(404).send('escolaridade não encontrada');
 return;
 }
 res.render('confirmDelete', { escolaridade });
 } catch (error) {
 console.error('Erro ao carregar confirmação de exclusão:', error);
 res.render('error', { message: 'Erro ao carregar confirmação de exclusão', returnLink: '/logo' });
 }
}

async function deleteescolaridade(req, res) {
 const id = req.params.id;
 try {
 await escolaridadeModel.deleteescolaridade(id);
 res.redirect('/escolaridade');
 } catch (error) {
 console.error('Erro ao excluir escolaridade:', error);
 res.render('error', { message: 'Erro ao excluir escolaridade', returnLink: '/logo' });
 }
}

module.exports = {          
 listescolaridade,
 filterescolaridade,
 addescolaridade,
 showescolaridade,
 showEditForm,
 editescolaridade,
 showConfirmDeleteForm,
 deleteescolaridade
};
