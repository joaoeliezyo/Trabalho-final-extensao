// routes/local_execucao.js
const express = require('express');
const router = express.Router();
const local_execucaoController = require('../controllers/local_execucaoController');

router.get('/', local_execucaoController.listAll);
router.post('/filtro', local_execucaoController.filterByNome);

router.get('/forms/local_execucao', (req, res) => {
  res.render('forms/local_execucao', { local_execucao: { id_local: '', endereco: '', cep: '', bairro: '', cidade: '' }, isEdit: false });
});

router.post('/cadastrar', local_execucaoController.insert);
router.get('/:id/edit', local_execucaoController.getById);
router.post('/:id/edit', local_execucaoController.update);
router.post('/:id/delete', local_execucaoController.deleteRecord);

module.exports = router;
