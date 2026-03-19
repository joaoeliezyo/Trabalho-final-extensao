// models/linha_programaticaModel.js
const pool = require('../db');

async function getAllinha_programatica() {
  try {
    const [registros] = await pool.query('SELECT id_linha_programatica, nome FROM Linha_Programatica ORDER BY id_linha_programatica DESC');
    return registros;
  } catch (error) {
    throw error;
  }
}

async function getlinha_programaticaByNome(nome) {
  try {
    const [registros] = await pool.query(
      'SELECT * FROM Linha_Programatica WHERE nome LIKE ? ORDER BY id_linha_programatica DESC',
      [`%${nome}%`]
    );
    return registros;
  } catch (error) {
    throw error;
  }
}

async function getlinha_programaticaById(id) {
  try {
    const [registros] = await pool.query('SELECT * FROM Linha_Programatica WHERE id_linha_programatica = ?', [id]);
    return registros[0];
  } catch (error) {
    throw error;
  }
}

async function insertlinha_programatica(nome) {
  try {
    await pool.query('INSERT INTO Linha_Programatica (nome) VALUES (?)', [nome]);
    const [registros] = await pool.query('SELECT * FROM Linha_Programatica WHERE nome LIKE ? ORDER BY id_linha_programatica DESC', [`%${nome}%`]);
    return registros;
  } catch (error) {
    throw error;
  }
}

async function updatelinha_programatica(id, nome) {
  try {
    await pool.query('UPDATE Linha_Programatica SET nome = ? WHERE id_linha_programatica = ?', [nome, id]);
  } catch (error) {
    throw error;
  }
}

async function deletelinha_programatica(id) {
  try {
    await pool.query('DELETE FROM Linha_Programatica WHERE id_linha_programatica = ?', [id]);
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getAllinha_programatica,
  getlinha_programaticaByNome,
  getlinha_programaticaById,
  insertlinha_programatica,
  updatelinha_programatica,
  deletelinha_programatica
};
