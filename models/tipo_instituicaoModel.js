// models/tipo_instituicaoModel.js
const pool = require('../db');

async function getAlltipo_instituicao() {
  try {
    const [registros] = await pool.query('SELECT id_tipo_instituicao, descricao FROM Tipo_Instituicao ORDER BY id_tipo_instituicao DESC');
    return registros;
  } catch (error) {
    throw error;
  }
}

async function gettipo_instituicaoByNome(nome) {
  try {
    const [registros] = await pool.query(
      'SELECT * FROM Tipo_Instituicao WHERE descricao LIKE ? ORDER BY id_tipo_instituicao DESC',
      [`%${nome}%`]
    );
    return registros;
  } catch (error) {
    throw error;
  }
}

async function gettipo_instituicaoById(id) {
  try {
    const [registros] = await pool.query('SELECT * FROM Tipo_Instituicao WHERE id_tipo_instituicao = ?', [id]);
    return registros[0];
  } catch (error) {
    throw error;
  }
}

async function inserttipo_instituicao(descricao) {
  try {
    await pool.query('INSERT INTO Tipo_Instituicao (descricao) VALUES (?)', [descricao]);
    const [registros] = await pool.query('SELECT * FROM Tipo_Instituicao WHERE descricao LIKE ? ORDER BY id_tipo_instituicao DESC', [`%${descricao}%`]);
    return registros;
  } catch (error) {
    throw error;
  }
}

async function updatetipo_instituicao(id, descricao) {
  try {
    await pool.query('UPDATE Tipo_Instituicao SET descricao = ? WHERE id_tipo_instituicao = ?', [descricao, id]);
  } catch (error) {
    throw error;
  }
}

async function deletetipo_instituicao(id) {
  try {
    await pool.query('DELETE FROM Tipo_Instituicao WHERE id_tipo_instituicao = ?', [id]);
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getAlltipo_instituicao,
  gettipo_instituicaoByNome,
  gettipo_instituicaoById,
  inserttipo_instituicao,
  updatetipo_instituicao,
  deletetipo_instituicao
};
