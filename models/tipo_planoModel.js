// models/tipo_planoModel.js
const pool = require('../db');

async function getAlltipo_plano() {
  try {
    const [registros] = await pool.query('SELECT id_tipo_plano, descricao FROM Tipo_Plano ORDER BY id_tipo_plano DESC');
    return registros;
  } catch (error) {
    throw error;
  }
}

async function gettipo_planoByNome(nome) {
  try {
    const [registros] = await pool.query(
      'SELECT * FROM Tipo_Plano WHERE descricao LIKE ? ORDER BY id_tipo_plano DESC',
      [`%${nome}%`]
    );
    return registros;
  } catch (error) {
    throw error;
  }
}

async function gettipo_planoById(id) {
  try {
    const [registros] = await pool.query('SELECT * FROM Tipo_Plano WHERE id_tipo_plano = ?', [id]);
    return registros[0];
  } catch (error) {
    throw error;
  }
}

async function inserttipo_plano(descricao) {
  try {
    await pool.query('INSERT INTO Tipo_Plano (descricao) VALUES (?)', [descricao]);
    const [registros] = await pool.query('SELECT * FROM Tipo_Plano WHERE descricao LIKE ? ORDER BY id_tipo_plano DESC', [`%${descricao}%`]);
    return registros;
  } catch (error) {
    throw error;
  }
}

async function updatetipo_plano(id, descricao) {
  try {
    await pool.query('UPDATE Tipo_Plano SET descricao = ? WHERE id_tipo_plano = ?', [descricao, id]);
  } catch (error) {
    throw error;
  }
}

async function deletetipo_plano(id) {
  try {
    await pool.query('DELETE FROM Tipo_Plano WHERE id_tipo_plano = ?', [id]);
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getAlltipo_plano,
  gettipo_planoByNome,
  gettipo_planoById,
  inserttipo_plano,
  updatetipo_plano,
  deletetipo_plano
};
