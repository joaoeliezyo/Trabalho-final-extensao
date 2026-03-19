const faixa_etariaModel = require('../models/faixa_etariaModel');

async function listfaixaetaria(req, res) {
 try {
 const faixaetaria = await faixa_etariaModel.getAllfaixa_etaria();
 res.render('consultas/faixa_etaria', { dados: faixaetaria });
 } catch (error) {
 console.error('Erro ao buscar cursos:', error);
 res.render('error', { message: 'Erro ao buscar cursos', returnLink: '/logo' });
 }
}

async function filterfaixaetaria(req, res) {
 const { nome } = req.body;
 try {
 const faixaetaria = await faixa_etariaModel.getfaixa_etariaByNome(nome || '');
 if (!faixaetaria || faixaetaria.length === 0) {
 res.render('consultas/faixa_etaria', { dados: [] });
 return;
 }
 res.render('consultas/faixa_etaria', { dados: faixaetaria });
 } catch (error) {
 console.error('Erro ao filtrar curso:', error);
 res.render('error', { message: 'Erro ao filtrar curso', returnLink: '/logo' });
 }
}

async function addfaixaetaria(req, res) {
 const { nome_faixaetaria } = req.body;
 try {
 await faixa_etariaModel.insertfaixaetaria(nome_faixaetaria);
 res.redirect('/faixa_etaria');
 } catch (error) {
 console.error('Erro ao inserir faixa etaria:', error);
 res.render('error', { message: 'Erro ao inserir faixa etaria', returnLink: '/logo' });
 }
}

async function showfaixaetaria(req, res) {
 const id = req.params.id;
 try {
 const faixaetaria = await faixa_etariaModel.getfaixa_etariaById(id);
 if (!faixaetaria) {
 res.status(404).send('Faixa etaria não encontrada');
 return;
 }
 res.render('consultas/faixa_etaria', { dados: [faixaetaria] });
 } catch (error) {
 console.error('Erro ao buscar faixa etaria:', error);
 res.render('error', { message: 'Erro ao buscar faixa etaria', returnLink: '/logo' });
 }
}

async function showEditForm(req, res) {
 const id = req.params.id;
 try {
 const faixaetaria = await faixa_etariaModel.getfaixa_etariaById(id);
 if (!faixaetaria) {
 res.status(404).send('Faixa etaria não encontrada');
 return;
 }
 res.render('forms/faixa_etaria', { faixaetaria, isEdit: true });
 } catch (error) {
 console.error('Erro ao carregar faixa etaria para edição:', error);
 res.render('error', { message: 'Erro ao carregar faixa etaria para edição', returnLink: '/faixa_etaria' });
 }
}

async function editfaixaetaria(req, res) {
 const id = req.params.id;
 const { nome_faixaetaria } = req.body;
 try {
 await faixa_etariaModel.updatefaixa_etaria(id, nome_faixaetaria);
 res.redirect('/faixa_etaria');
 } catch (error) {
 console.error('Erro ao editar faixa etaria:', error);
 res.render('error', { message: 'Erro ao editar faixa etaria', returnLink: '/logo' });
 }
}

async function showConfirmDeleteForm(req, res) {
 const id = req.params.id;
 try {
 const faixaetaria = await faixa_etariaModel.getfaixa_etariaById(id);
 if (!faixaetaria) {
 res.status(404).send('Faixa etaria não encontrada');
 return;
 }
 res.render('confirmDelete', { faixaetaria });
 } catch (error) {
 console.error('Erro ao carregar confirmação de exclusão:', error);
 res.render('error', { message: 'Erro ao carregar confirmação de exclusão', returnLink: '/logo' });
 }
}

async function deletefaixaetaria(req, res) {
 const id = req.params.id;
 try {
 await faixa_etariaModel.deletefaixa_etaria(id);
 res.redirect('/faixa_etaria');
 } catch (error) {
 console.error('Erro ao excluir faixa etaria:', error);
 res.render('error', { message: 'Erro ao excluir faixa etaria', returnLink: '/logo' });
 }
}

module.exports = {          
 listfaixaetaria,
 filterfaixaetaria,
 addfaixaetaria,
 showfaixaetaria,
 showEditForm,
 editfaixaetaria,
 showConfirmDeleteForm,
 deletefaixaetaria
};
