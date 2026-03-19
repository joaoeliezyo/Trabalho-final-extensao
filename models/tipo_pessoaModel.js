// tipo_pessoaModel.js - acessa a tabela tipo_pessoa
const pool = require('../db');

function runQuery(sql, params = []) {
  return pool.query(sql, params).then(([rows]) => rows);
}

async function getAlltipo_pessoa() {
  return runQuery('SELECT id_tipo_pessoa, descricao FROM tipo_pessoa ORDER BY id_tipo_pessoa DESC');
}

async function gettipo_pessoaByNome(nome) {
  return runQuery(
    'SELECT * FROM tipo_pessoa WHERE descricao LIKE ? ORDER BY id_tipo_pessoa DESC',
    ['%' + nome + '%']
  );
}

async function gettipo_pessoaByNomedelete(nome) {
  const registros = await runQuery(
    'SELECT * FROM tipo_pessoa WHERE descricao = ? ORDER BY id_tipo_pessoa DESC',
    [nome]
  );
  return registros[0];
}

async function inserttipo_pessoa(registro) {
  await runQuery(
    'INSERT INTO tipo_pessoa (descricao) VALUES (?)',
    [registro['descricao'] ?? null]
  );
  const termoBusca = registro['descricao'] ?? '';
  return gettipo_pessoaByNome(termoBusca);
}

async function gettipo_pessoaById(id) {
  const registros = await runQuery(
    'SELECT * FROM tipo_pessoa WHERE id_tipo_pessoa = ?',
    [id]
  );
  return registros[0];
}

async function deletetipo_pessoa(id) {
  await runQuery(
    'DELETE FROM tipo_pessoa WHERE id_tipo_pessoa = ?',
    [id]
  );
}

async function updatetipo_pessoa(id, registro) {
  await runQuery(
    'UPDATE tipo_pessoa SET descricao = ? WHERE id_tipo_pessoa = ?',
    [registro['descricao'] ?? null, id]
  );
  return gettipo_pessoaById(id);
}

module.exports = {
  getAlltipo_pessoa,
  gettipo_pessoaByNome,
  gettipo_pessoaByNomedelete,
  inserttipo_pessoa,
  gettipo_pessoaById,
  deletetipo_pessoa,
  updatetipo_pessoa
};
