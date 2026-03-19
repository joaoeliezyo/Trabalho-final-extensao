// routes/publico_alvo.js
const express = require('express');
const router = express.Router();
const publico_alvoController = require('../controllers/publico_alvoController');

router.get('/', publico_alvoController.listAll);
router.post('/filtro', publico_alvoController.filterByNome);

router.get('/forms/publico_alvo', (req, res) => {
  res.render('forms/publico_alvo', { publico_alvo: { id_publico_alvo: '', descricao: '' }, isEdit: false });
});

router.post('/cadastrar', publico_alvoController.insert);
router.get('/:id/edit', publico_alvoController.getById);
router.post('/:id/edit', publico_alvoController.update);
router.post('/:id/delete', publico_alvoController.deleteRecord);

module.exports = router;
