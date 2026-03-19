// controllers/usuarioController.js
const usuarioModel = require('../models/usuarioModel');

async function login(req, res) {
  const { username, password } = req.body;
  try {
    const user = await usuarioModel.getUserByUsernameAndPassword(username, password);

    if (user) {
      // Usuário autenticado, salvar na sessão
      req.session.usuario = user.usuario;
      req.session.tipo = user.tipo;
      req.session.id_usuario = user.id_usuario;
      
      // Redirecionar para o dashboard
      res.redirect('/logo');
    } else {
      // Credenciais inválidas
      res.redirect('/login?erro=Credenciais inválidas');
    }
  } catch (error) {
    console.error('Erro durante a autenticação:', error);
    res.status(500).send('Erro durante a autenticação');
  }
}

async function welcome(req, res) {
  const { username, tipo } = req.query;
  // Renderizar a página de boas-vindas com os dados do usuário
  res.render('welcome', { usuario: username, tipo: tipo });
}

function logout(req, res) {
  req.session.destroy((err) => {
    if (err) {
      console.error('Erro ao fazer logout:', err);
      return res.status(500).send('Erro ao fazer logout');
    }
    res.redirect('/login');
  });
}

module.exports = { login, welcome, logout }; 