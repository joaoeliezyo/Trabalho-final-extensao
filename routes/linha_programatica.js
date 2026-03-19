// routes/linha_programatica.js
const express = require('express');
const router = express.Router();
const linha_programaticaController = require('../controllers/linha_programaticaController');

router.get('/', linha_programaticaController.listAll);
router.post('/filtro', linha_programaticaController.filterByNome);

router.get('/forms/linha_programatica', (req, res) => {
  res.render('forms/linha_programatica', { linha_programatica: { id_linha_programatica: '', nome: '' }, isEdit: false });
});

router.post('/cadastrar', linha_programaticaController.insert);
router.get('/:id/edit', linha_programaticaController.getById);
router.post('/:id/edit', linha_programaticaController.update);
router.post('/:id/delete', linha_programaticaController.deleteRecord);

module.exports = router;
