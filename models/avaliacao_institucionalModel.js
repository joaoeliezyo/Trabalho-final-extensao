// avaliacao_institucionalModel.js
const pool = require('../db');

async function getAllavaliacao_institucionals() {
  const [registros] = await pool.query(
    'SELECT id_avaliacao, id_projeto, criterios_avaliacao, metodologia_avaliacao, forma_apresentacao_relatorio FROM avaliacao_institucional'
  );
  return registros;
}

async function getavaliacao_institucionalByNome(nome) {
  const [registros] = await pool.query(
    'SELECT * FROM avaliacao_institucional WHERE criterios_avaliacao LIKE ? ORDER BY id_avaliacao DESC',
    [`%${nome}%`]
  );
  return registros;
}

async function getavaliacao_institucionalByNomedelete(nome) {
  const [registros] = await pool.query(
    'SELECT * FROM avaliacao_institucional WHERE criterios_avaliacao = ? ORDER BY id_avaliacao DESC',
    [nome]
  );
  return registros[0];
}

async function insertavaliacao_institucional(registro) {
  await pool.query(
    'INSERT INTO avaliacao_institucional (id_projeto, criterios_avaliacao, metodologia_avaliacao, forma_apresentacao_relatorio) VALUES (?, ?, ?, ?)',
    [
      registro.id_projeto ?? null,
      registro.criterios_avaliacao ?? null,
      registro.metodologia_avaliacao ?? null,
      registro.forma_apresentacao_relatorio ?? null
    ]
  );

  const termoBusca = registro.criterios_avaliacao ?? '';
  const [registros] = await pool.query(
    'SELECT * FROM avaliacao_institucional WHERE criterios_avaliacao LIKE ? ORDER BY id_avaliacao DESC',
    [`%${termoBusca}%`]
  );
  return registros;
}

async function getavaliacao_institucionalById(id) {
  const [registros] = await pool.query(
    'SELECT * FROM avaliacao_institucional WHERE id_avaliacao = ?',
    [id]
  );
  return registros[0];
}

async function deleteavaliacao_institucional(id) {
  await pool.query(
    'DELETE FROM avaliacao_institucional WHERE id_avaliacao = ?',
    [id]
  );
}

async function updateavaliacao_institucional(id, registro) {
  await pool.query(
    'UPDATE avaliacao_institucional SET id_projeto = ?, criterios_avaliacao = ?, metodologia_avaliacao = ?, forma_apresentacao_relatorio = ? WHERE id_avaliacao = ?',
    [
      registro.id_projeto ?? null,
      registro.criterios_avaliacao ?? null,
      registro.metodologia_avaliacao ?? null,
      registro.forma_apresentacao_relatorio ?? null,
      id
    ]
  );

  return await getavaliacao_institucionalById(id);
}

module.exports = {
  getAllavaliacao_institucionals,
  getavaliacao_institucionalByNome,
  getavaliacao_institucionalByNomedelete,
  insertavaliacao_institucional,
  getavaliacao_institucionalById,
  deleteavaliacao_institucional,
  updateavaliacao_institucional
};
