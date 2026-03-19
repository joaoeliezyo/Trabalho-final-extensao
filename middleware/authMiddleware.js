// middleware/authMiddleware.js
const authMiddleware = (req, res, next) => {
  // Verificar se existe sessão/usuário autenticado
  if (!req.session || !req.session.usuario) {
    return res.redirect('/login');
  }
  next();
};

module.exports = authMiddleware;
