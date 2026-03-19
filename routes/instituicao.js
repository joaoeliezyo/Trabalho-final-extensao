// routes/instituicao.js
const express = require('express');
const router = express.Router();
const instituicaoController = require('../controllers/instituicaoController');

router.get('/', instituicaoController.listAll);
router.post('/filtro', instituicaoController.filterByNome);
router.get('/forms/instituicao', instituicaoController.formPage);
router.post('/cadastrar', instituicaoController.insert);
router.get('/:id/edit', instituicaoController.getById);
router.post('/:id/edit', instituicaoController.update);
router.post('/:id/delete', instituicaoController.deleteRecord);

module.exports = router;
