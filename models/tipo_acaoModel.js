// models/tipo_acaoModel.js
const pool = require('../db');

async function getAlltipo_acao() {
  try {
    const [registros] = await pool.query('SELECT id_tipo_acao, nome FROM Tipo_Acao ORDER BY id_tipo_acao DESC');
    return registros;
  } catch (error) {
    throw error;
  }
}

async function gettipo_acaoByNome(nome) {
  try {
    const [registros] = await pool.query(
      'SELECT * FROM Tipo_Acao WHERE nome LIKE ? ORDER BY id_tipo_acao DESC',
      [`%${nome}%`]
    );
    return registros;
  } catch (error) {
    throw error;
  }
}

async function gettipo_acaoById(id) {
  try {
    const [registros] = await pool.query('SELECT * FROM Tipo_Acao WHERE id_tipo_acao = ?', [id]);
    return registros[0];
  } catch (error) {
    throw error;
  }
}

async function inserttipo_acao(nome) {
  try {
    await pool.query('INSERT INTO Tipo_Acao (nome) VALUES (?)', [nome]);
    const [registros] = await pool.query('SELECT * FROM Tipo_Acao WHERE nome LIKE ? ORDER BY id_tipo_acao DESC', [`%${nome}%`]);
    return registros;
  } catch (error) {
    throw error;
  }
}

async function updatetipo_acao(id, nome) {
  try {
    await pool.query('UPDATE Tipo_Acao SET nome = ? WHERE id_tipo_acao = ?', [nome, id]);
  } catch (error) {
    throw error;
  }
}

async function deletetipo_acao(id) {
  try {
    await pool.query('DELETE FROM Tipo_Acao WHERE id_tipo_acao = ?', [id]);
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getAlltipo_acao,
  gettipo_acaoByNome,
  gettipo_acaoById,
  inserttipo_acao,
  updatetipo_acao,
  deletetipo_acao
};
