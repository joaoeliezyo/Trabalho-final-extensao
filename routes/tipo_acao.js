// routes/tipo_acao.js
const express = require('express');
const router = express.Router();
const tipo_acaoController = require('../controllers/tipo_acaoController');

router.get('/', tipo_acaoController.listAll);
router.post('/filtro', tipo_acaoController.filterByNome);

router.get('/forms/tipo_acao', (req, res) => {
  res.render('forms/tipo_acao', { tipo_acao: { id_tipo_acao: '', nome: '' }, isEdit: false });
});

router.post('/cadastrar', tipo_acaoController.insert);
router.get('/:id/edit', tipo_acaoController.getById);
router.post('/:id/edit', tipo_acaoController.update);
router.post('/:id/delete', tipo_acaoController.deleteRecord);

module.exports = router;
