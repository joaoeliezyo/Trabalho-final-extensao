// models/publico_alvoModel.js
const pool = require('../db');

async function getAllpublico_alvo() {
  try {
    const [registros] = await pool.query('SELECT id_publico_alvo, descricao FROM Publico_Alvo ORDER BY id_publico_alvo DESC');
    return registros;
  } catch (error) {
    throw error;
  }
}

async function getpublico_alvoByNome(nome) {
  try {
    const [registros] = await pool.query(
      'SELECT * FROM Publico_Alvo WHERE descricao LIKE ? ORDER BY id_publico_alvo DESC',
      [`%${nome}%`]
    );
    return registros;
  } catch (error) {
    throw error;
  }
}

async function getpublico_alvoById(id) {
  try {
    const [registros] = await pool.query('SELECT * FROM Publico_Alvo WHERE id_publico_alvo = ?', [id]);
    return registros[0];
  } catch (error) {
    throw error;
  }
}

async function insertpublico_alvo(descricao) {
  try {
    await pool.query('INSERT INTO Publico_Alvo (descricao) VALUES (?)', [descricao]);
    const [registros] = await pool.query('SELECT * FROM Publico_Alvo WHERE descricao LIKE ? ORDER BY id_publico_alvo DESC', [`%${descricao}%`]);
    return registros;
  } catch (error) {
    throw error;
  }
}

async function updatepublico_alvo(id, descricao) {
  try {
    await pool.query('UPDATE Publico_Alvo SET descricao = ? WHERE id_publico_alvo = ?', [descricao, id]);
  } catch (error) {
    throw error;
  }
}

async function deletepublico_alvo(id) {
  try {
    await pool.query('DELETE FROM Publico_Alvo WHERE id_publico_alvo = ?', [id]);
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getAllpublico_alvo,
  getpublico_alvoByNome,
  getpublico_alvoById,
  insertpublico_alvo,
  updatepublico_alvo,
  deletepublico_alvo
};
