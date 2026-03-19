// models/papel_projetoModel.js
const pool = require('../db');

async function getAllpapel_projeto() {
  try {
    const [registros] = await pool.query('SELECT id_papel, descricao FROM Papel_Projeto ORDER BY id_papel DESC');
    return registros;
  } catch (error) {
    throw error;
  }
}

async function getpapel_projetoByNome(nome) {
  try {
    const [registros] = await pool.query(
      'SELECT * FROM Papel_Projeto WHERE descricao LIKE ? ORDER BY id_papel DESC',
      [`%${nome}%`]
    );
    return registros;
  } catch (error) {
    throw error;
  }
}

async function getpapel_projetoById(id) {
  try {
    const [registros] = await pool.query('SELECT * FROM Papel_Projeto WHERE id_papel = ?', [id]);
    return registros[0];
  } catch (error) {
    throw error;
  }
}

async function insertpapel_projeto(descricao) {
  try {
    await pool.query('INSERT INTO Papel_Projeto (descricao) VALUES (?)', [descricao]);
    const [registros] = await pool.query('SELECT * FROM Papel_Projeto WHERE descricao LIKE ? ORDER BY id_papel DESC', [`%${descricao}%`]);
    return registros;
  } catch (error) {
    throw error;
  }
}

async function updatepapel_projeto(id, descricao) {
  try {
    await pool.query('UPDATE Papel_Projeto SET descricao = ? WHERE id_papel = ?', [descricao, id]);
  } catch (error) {
    throw error;
  }
}

async function deletepapel_projeto(id) {
  try {
    await pool.query('DELETE FROM Papel_Projeto WHERE id_papel = ?', [id]);
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getAllpapel_projeto,
  getpapel_projetoByNome,
  getpapel_projetoById,
  insertpapel_projeto,
  updatepapel_projeto,
  deletepapel_projeto
};
