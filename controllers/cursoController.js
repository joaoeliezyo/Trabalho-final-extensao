// cursoController.js
const cursoModel = require('../models/cursoModel');

async function listcursos(req, res) {
 try {
 const cursos = await cursoModel.getAllCursos();
 res.render('consultas/curso', { dados: cursos });
 } catch (error) {
 console.error('Erro ao buscar cursos:', error);
 res.render('error', { message: 'Erro ao buscar cursos', returnLink: '/logo' });
 }
}

async function filtercurso(req, res) {
 const { nome } = req.body;
 try {
 const cursos = await cursoModel.getcursoByNome(nome || '');
 if (!cursos || cursos.length === 0) {
 res.render('consultas/curso', { dados: [] });
 return;
 }
 res.render('consultas/curso', { dados: cursos });
 } catch (error) {
 console.error('Erro ao filtrar curso:', error);
 res.render('error', { message: 'Erro ao filtrar curso', returnLink: '/logo' });
 }
}

async function addcurso(req, res) {
 const { nome_curso } = req.body;
 try {
 await cursoModel.insertcurso(nome_curso);
 res.redirect('/curso');
 } catch (error) {
 console.error('Erro ao inserir curso:', error);
 res.render('error', { message: 'Erro ao inserir curso', returnLink: '/logo' });
 }
}

async function showcurso(req, res) {
 const id = req.params.id;
 try {
 const curso = await cursoModel.getcursoById(id);
 if (!curso) {
 res.status(404).send('Curso não encontrado');
 return;
 }
 res.render('consultas/curso', { dados: [curso] });
 } catch (error) {
 console.error('Erro ao buscar curso:', error);
 res.render('error', { message: 'Erro ao buscar curso', returnLink: '/logo' });
 }
}

async function showEditForm(req, res) {
 const id = req.params.id;
 try {
 const curso = await cursoModel.getcursoById(id);
 if (!curso) {
 res.status(404).send('Curso não encontrado');
 return;
 }
 res.render('forms/curso', { curso, isEdit: true });
 } catch (error) {
 console.error('Erro ao carregar curso para edição:', error);
 res.render('error', { message: 'Erro ao carregar curso para edição', returnLink: '/curso' });
 }
}

async function editcurso(req, res) {
 const id = req.params.id;
 const { nome_curso } = req.body;
 try {
 await cursoModel.updateCurso(id, nome_curso);
 res.redirect('/curso');
 } catch (error) {
 console.error('Erro ao editar curso:', error);
 res.render('error', { message: 'Erro ao editar curso', returnLink: '/curso' });
 }
}

async function showConfirmDeleteForm(req, res) {
 const id = req.params.id;
 try {
 const curso = await cursoModel.getcursoById(id);
 if (!curso) {
 res.status(404).send('Curso não encontrado');
 return;
 }
 res.render('confirmDelete', { curso });
 } catch (error) {
 console.error('Erro ao carregar confirmação de exclusão:', error);
 res.render('error', { message: 'Erro ao carregar confirmação de exclusão', returnLink: '/curso' });
 }
}

async function deletecurso(req, res) {
 const id = req.params.id;
 try {
 await cursoModel.deletecurso(id);
 res.redirect('/curso');
 } catch (error) {
 console.error('Erro ao excluir curso:', error);
 res.render('error', { message: 'Erro ao excluir curso', returnLink: '/curso' });
 }
}

module.exports = {
 listcursos,
 filtercurso,
 addcurso,
 showcurso,
 showEditForm,
 editcurso,
 showConfirmDeleteForm,
 deletecurso
};
