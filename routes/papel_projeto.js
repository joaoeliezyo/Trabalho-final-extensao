// routes/papel_projeto.js
const express = require('express');
const router = express.Router();
const papel_projetoController = require('../controllers/papel_projetoController');

router.get('/', papel_projetoController.listAll);
router.post('/filtro', papel_projetoController.filterByNome);

router.get('/forms/papel_projeto', (req, res) => {
  res.render('forms/papel_projeto', { papel_projeto: { id_papel: '', descricao: '' }, isEdit: false });
});

router.post('/cadastrar', papel_projetoController.insert);
router.get('/:id/edit', papel_projetoController.getById);
router.post('/:id/edit', papel_projetoController.update);
router.post('/:id/delete', papel_projetoController.deleteRecord);

module.exports = router;
