const pessoaModel = require('../models/pessoaModel');
const tipo_pessoaModel = require('../models/tipo_pessoaModel');

// Normaliza o corpo da request para o formato esperado pelo model de projetos de extensao
function mapRequestToRegistro(body) {
  const {
    id_pessoa,
    nome,
    cpf,
    email,
    telefone,
    id_tipo_pessoa
  } = body;

  return {
    id_pessoa,
    nome,
    cpf,
    email,
    telefone,
    id_tipo_pessoa
  };
}

async function listpessoas(req, res) {
  try {
    const pessoas = await pessoaModel.getAllpessoas();
    res.render('consultas/pessoa', { dados: pessoas });
  } catch (error) {
    console.error('Erro ao buscar pessoas:', error);
    res.render('error', { message: 'Erro ao buscar pessoas', returnLink: '/logo' });
  }
}

async function filterpessoas(req, res) {
  const { nome } = req.body;
  try {
    const pessoas = await pessoaModel.getpessoasByNome(nome || '');
    if (!pessoas || pessoas.length === 0) {
      res.render('consultas/pessoa', { dados: [] });
      return;
    }
    res.render('consultas/pessoa', { dados: pessoas });
  } catch (error) {
    console.error('Erro ao filtrar pessoas:', error);
    res.render('error', { message: 'Erro ao filtrar pessoas', returnLink: '/logo' });
  }
}

async function addpessoas(req, res) {
  try {
    await pessoaModel.insertpessoas(mapRequestToRegistro(req.body));
    res.redirect('/pessoa');
  } catch (error) {
    console.error('Erro ao inserir pessoas:', error);
    res.render('error', { message: 'Erro ao inserir pessoas', returnLink: '/pessoa' });
  }
}

async function showpessoas(req, res) {
  const id = req.params.id;
  try {
    const pessoas = await pessoaModel.getpessoasById(id);
    if (!pessoas) {
      res.status(404).send('pessoas nao encontrado');
      return;
    }
    res.render('consultas/pessoa', { dados: [pessoas] });
  } catch (error) {
    console.error('Erro ao buscar pessoas:', error);
    res.render('error', { message: 'Erro ao buscar pessoas', returnLink: '/logo' });
  }
}

async function showEditForm(req, res) {
  const id = req.params.id;
  try {
    const pessoas = await pessoaModel.getpessoasById(id);
    if (!pessoas) {
      res.status(404).send('pessoas nao encontrado');
      return;
    }
    const tiposPessoa = await tipo_pessoaModel.getAlltipo_pessoa();
    res.render('forms/pessoa', { pessoa: pessoas, isEdit: true, tiposPessoa });
  } catch (error) {
    console.error('Erro ao carregar pessoas para edicao:', error);
    res.render('error', { message: 'Erro ao carregar pessoas para edicao', returnLink: '/pessoa' });
  }
}

async function editpessoas(req, res) {
  const id = req.params.id;
  try {
    await pessoaModel.updatepessoas(id, mapRequestToRegistro(req.body));
    res.redirect('/pessoa');
  } catch (error) {
    console.error('Erro ao editar pessoas:', error);
    res.render('error', { message: 'Erro ao editar pessoas', returnLink: '/pessoa' });
  }
}

async function showConfirmDeleteForm(req, res) {
  const id = req.params.id;
  try {
    const pessoas = await pessoaModel.getpessoasById(id);
    if (!pessoas) {
      res.status(404).send('pessoa nao encontrado');
      return;
    }
    res.render('confirmDelete', { pessoas });
  } catch (error) {
    console.error('Erro ao carregar confirmacao de exclusao:', error);
    res.render('error', { message: 'Erro ao carregar confirmacao de exclusao', returnLink: '/pessoa' });
  }
}

async function deletepessoas(req, res) {
  const id = req.params.id;
  try {
    await pessoaModel.deletepessoas(id);
    res.redirect('/pessoa');
  } catch (error) {
    console.error('Erro ao excluir pessoa:', error);
    res.render('error', { message: 'Erro ao excluir pessoas', returnLink: '/pessoa' });
  }
}

module.exports = {
  listpessoas,
  filterpessoas,
  addpessoas,
  showpessoas,
  showEditForm,
  editpessoas,
  showConfirmDeleteForm,
  deletepessoas
};
    