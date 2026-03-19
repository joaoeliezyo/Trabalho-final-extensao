// projeto_assinaturaController.js
const projeto_assinaturaModel = require('../models/projeto_assinaturaModel');

async function listprojeto_assinatura(req, res) {
  try {
    const projeto_assinatura = await projeto_assinaturaModel.getAllProjeto_assinatura();
    res.render('consultas/projeto_assinatura', { dados: projeto_assinatura });
  } catch (error) {
    console.error('Erro ao buscar assinaturas:', error);
    res.render('error', { message: 'Erro ao buscar assinaturas', returnLink: '/welcome' });
  }
}

async function filterprojeto_assinatura(req, res) {
  const { nome } = req.body;
  try {
    const projeto_assinatura = await projeto_assinaturaModel.getProjeto_assinaturaByNome(nome || '');
    if (!projeto_assinatura || projeto_assinatura.length === 0) {
      res.render('consultas/projeto_assinatura', { dados: [] });
      return;
    }
    res.render('consultas/projeto_assinatura', { dados: projeto_assinatura });
  } catch (error) {
    console.error('Erro ao filtrar assinaturas:', error);
    res.render('error', { message: 'Erro ao filtrar assinaturas', returnLink: '/welcome' });
  }
}

async function addprojeto_assinatura(req, res) {
  const id_pessoa = req.id_pessoa ?? req.body.id_pessoa ?? null;
  try {
    await projeto_assinaturaModel.insertProjeto_assinatura(
      req.body,
      { id_pessoa }
    );
    res.redirect('/projeto_assinatura');
  } catch (error) {
    console.error('Erro ao inserir assinatura:', error);
    res.render('error', { message: 'Erro ao inserir assinatura', returnLink: '/logo' });
  }
}

async function showprojeto_assinatura(req, res) {
  const id = req.params.id;
  try {
    const projeto_assinatura = await projeto_assinaturaModel.getProjeto_assinaturaById(id);
    if (!projeto_assinatura) {
      res.status(404).send('projeto_assinatura nao encontrado');
      return;
    }
    res.render('consultas/projeto_assinatura', { dados: [projeto_assinatura] });
  } catch (error) {
    console.error('Erro ao buscar projeto_assinatura:', error);
    res.render('error', { message: 'Erro ao buscar projeto_assinatura', returnLink: '/welcome' });
  }
}

async function showEditForm(req, res) {
  const id = req.params.id;
  try {
    const projeto_assinatura = await projeto_assinaturaModel.getProjeto_assinaturaById(id);
    if (!projeto_assinatura) {
      res.status(404).send('projeto_assinatura nao encontrado');
      return;
    }
    res.render('forms/projeto_assinatura', { projeto_assinatura, isEdit: true });
  } catch (error) {
    console.error('Erro ao carregar assinatura para edicao:', error);
    res.render('error', { message: 'Erro ao carregar assinatura para edicao', returnLink: '/projeto_assinatura' });
  }
}

async function editprojeto_assinatura(req, res) {
  const id = req.params.id;
  try {
    await projeto_assinaturaModel.updateProjeto_assinatura(id, req.body);
    res.redirect('/projeto_assinatura');
  } catch (error) {
    console.error('Erro ao editar assinatura:', error);
    res.render('error', { message: 'Erro ao editar assinatura', returnLink: '/projeto_assinatura' });
  }
}

async function showConfirmDeleteFormprojeto_assinatura(req, res) {
  const id = req.params.id;
  try {
    const projeto_assinatura = await projeto_assinaturaModel.getProjeto_assinaturaById(id);
    if (!projeto_assinatura) {
      res.status(404).send('projeto_assinatura nao encontrado');
      return;
    }
    res.render('confirmDelete', { curso: projeto_assinatura });
  } catch (error) {
    console.error('Erro ao carregar confirmacao de exclusao:', error);
    res.render('error', { message: 'Erro ao carregar confirmacao de exclusao', returnLink: '/projeto_assinatura' });
  }
}

async function deleteprojeto_assinatura(req, res) {
  const id = req.params.id;
  try {
    await projeto_assinaturaModel.deleteProjeto_assinatura(id);
    res.redirect('/projeto_assinatura');
  } catch (error) {
    console.error('Erro ao excluir assinatura:', error);
    res.render('error', { message: 'Erro ao excluir assinatura', returnLink: '/projeto_assinatura' });
  }
}

async function showAssinar(req, res) {
  const id_projeto = req.params.id_projeto;
  try {
    const [dados, resumoAssinaturas] = await Promise.all([
      projeto_assinaturaModel.getProjeto_assinaturaByProjeto(id_projeto),
      projeto_assinaturaModel.getResumoAssinaturasByProjeto(id_projeto)
    ]);
    res.render('consultas/projeto_assinatura', { dados, id_projeto, resumoAssinaturas });
  } catch (error) {
    console.error('Erro ao carregar assinaturas do projeto:', error);
    res.render('error', { message: 'Erro ao carregar assinaturas do projeto', returnLink: '/projeto_extensao' });
  }
}

async function assinarProjeto(req, res) {
  const id_projeto = req.params.id_projeto;
  const id_pessoa = req.id_pessoa ?? null;
  try {
    if (!id_pessoa) {
      return res.render('error', { message: 'Sessao invalida: id_pessoa nao encontrado. Faca login novamente.', returnLink: '/login' });
    }

    await projeto_assinaturaModel.insertProjeto_assinatura(
      { id_projeto, ordem: null },
      { id_pessoa }
    );
    res.redirect(`/projeto_assinatura/${id_projeto}/assinar`);
  } catch (error) {
    console.error('Erro ao assinar projeto:', error);
    res.render('error', { message: 'Erro ao assinar projeto', returnLink: '/projeto_extensao' });
  }
}

module.exports = {
  listprojeto_assinatura,
  filterprojeto_assinatura,
  addprojeto_assinatura,
  showprojeto_assinatura,
  showEditForm,
  editprojeto_assinatura,
  showConfirmDeleteFormprojeto_assinatura,
  deleteprojeto_assinatura,
  showAssinar,
  assinarProjeto
};