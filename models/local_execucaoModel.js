// models/local_execucaoModel.js
const pool = require('../db');

async function getAlllocal_execucao() {
  try {
    const [registros] = await pool.query('SELECT id_local, endereco, cep, bairro, cidade FROM Local_Execucao ORDER BY id_local DESC');
    return registros;
  } catch (error) {
    throw error;
  }
}

async function getlocal_execucaoByNome(nome) {
  try {
    const [registros] = await pool.query(
      'SELECT * FROM Local_Execucao WHERE endereco LIKE ? OR cidade LIKE ? ORDER BY id_local DESC',
      [`%${nome}%`, `%${nome}%`]
    );
    return registros;
  } catch (error) {
    throw error;
  }
}

async function getlocal_execucaoById(id) {
  try {
    const [registros] = await pool.query('SELECT * FROM Local_Execucao WHERE id_local = ?', [id]);
    return registros[0];
  } catch (error) {
    throw error;
  }
}

async function insertlocal_execucao(endereco, cep, bairro, cidade) {
  try {
    await pool.query('INSERT INTO Local_Execucao (endereco, cep, bairro, cidade) VALUES (?, ?, ?, ?)', [endereco, cep, bairro, cidade]);
    const [registros] = await pool.query('SELECT * FROM Local_Execucao WHERE endereco LIKE ? ORDER BY id_local DESC', [`%${endereco}%`]);
    return registros;
  } catch (error) {
    throw error;
  }
}

async function updatelocal_execucao(id, endereco, cep, bairro, cidade) {
  try {
    await pool.query('UPDATE Local_Execucao SET endereco = ?, cep = ?, bairro = ?, cidade = ? WHERE id_local = ?', [endereco, cep, bairro, cidade, id]);
  } catch (error) {
    throw error;
  }
}

async function deletelocal_execucao(id) {
  try {
    await pool.query('DELETE FROM Local_Execucao WHERE id_local = ?', [id]);
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getAlllocal_execucao,
  getlocal_execucaoByNome,
  getlocal_execucaoById,
  insertlocal_execucao,
  updatelocal_execucao,
  deletelocal_execucao
};
