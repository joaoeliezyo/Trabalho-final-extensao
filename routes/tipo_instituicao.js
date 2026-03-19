// routes/tipo_instituicao.js
const express = require('express');
const router = express.Router();
const tipo_instituicaoController = require('../controllers/tipo_instituicaoController');

router.get('/', tipo_instituicaoController.listAll);
router.post('/filtro', tipo_instituicaoController.filterByNome);

router.get('/forms/tipo_instituicao', (req, res) => {
  res.render('forms/tipo_instituicao', { tipo_instituicao: { id_tipo_instituicao: '', descricao: '' }, isEdit: false });
});

router.post('/cadastrar', tipo_instituicaoController.insert);
router.get('/:id/edit', tipo_instituicaoController.getById);
router.post('/:id/edit', tipo_instituicaoController.update);
router.post('/:id/delete', tipo_instituicaoController.deleteRecord);

module.exports = router;
