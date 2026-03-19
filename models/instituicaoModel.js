// models/instituicaoModel.js
const pool = require('../db');

async function getAllInstituicao() {
  try {
    const [registros] = await pool.query(
      'SELECT i.id_instituicao, i.nome, i.sigla, ti.descricao as tipo FROM Instituicao i LEFT JOIN Tipo_Instituicao ti ON i.fk_tipo_instituicao = ti.id_tipo_instituicao ORDER BY i.id_instituicao DESC'
    );
    return registros;
  } catch (error) {
    throw error;
  }
}

async function getInstituicaoByNome(nome) {
  try {
    const [registros] = await pool.query(
      'SELECT i.id_instituicao, i.nome, i.sigla, ti.descricao as tipo FROM Instituicao i LEFT JOIN Tipo_Instituicao ti ON i.fk_tipo_instituicao = ti.id_tipo_instituicao WHERE i.nome LIKE ? ORDER BY i.id_instituicao DESC',
      [`%${nome}%`]
    );
    return registros;
  } catch (error) {
    throw error;
  }
}

async function getInstituicaoById(id) {
  try {
    const [registros] = await pool.query('SELECT * FROM Instituicao WHERE id_instituicao = ?', [id]);
    return registros[0];
  } catch (error) {
    throw error;
  }
}

async function insertInstituicao(nome, sigla, fk_tipo_instituicao) {
  try {
    await pool.query('INSERT INTO Instituicao (nome, sigla, fk_tipo_instituicao) VALUES (?, ?, ?)', [nome, sigla, fk_tipo_instituicao]);
    const [registros] = await pool.query(
      'SELECT i.id_instituicao, i.nome, i.sigla, ti.descricao as tipo FROM Instituicao i LEFT JOIN Tipo_Instituicao ti ON i.fk_tipo_instituicao = ti.id_tipo_instituicao WHERE i.nome LIKE ? ORDER BY i.id_instituicao DESC',
      [`%${nome}%`]
    );
    return registros;
  } catch (error) {
    throw error;
  }
}

async function updateInstituicao(id, nome, sigla, fk_tipo_instituicao) {
  try {
    await pool.query('UPDATE Instituicao SET nome = ?, sigla = ?, fk_tipo_instituicao = ? WHERE id_instituicao = ?', [nome, sigla, fk_tipo_instituicao, id]);
  } catch (error) {
    throw error;
  }
}

async function deleteInstituicao(id) {
  try {
    await pool.query('DELETE FROM Instituicao WHERE id_instituicao = ?', [id]);
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getAllInstituicao,
  getInstituicaoByNome,
  getInstituicaoById,
  insertInstituicao,
  updateInstituicao,
  deleteInstituicao
};
