// routes/tipo_plano.js
const express = require('express');
const router = express.Router();
const tipo_planoController = require('../controllers/tipo_planoController');

router.get('/', tipo_planoController.listAll);
router.post('/filtro', tipo_planoController.filterByNome);

router.get('/forms/tipo_plano', (req, res) => {
  res.render('forms/tipo_plano', { tipo_plano: { id_tipo_plano: '', descricao: '' }, isEdit: false });
});

router.post('/cadastrar', tipo_planoController.insert);
router.get('/:id/edit', tipo_planoController.getById);
router.post('/:id/edit', tipo_planoController.update);
router.post('/:id/delete', tipo_planoController.deleteRecord);

module.exports = router;
