// projeto_custoModel.js gerado automaticamente para a tabela projeto_custo.

const pool = require('../db');

const baseSelect = "SELECT Id, id_projeto, descricao, quantitativo, valor_unitario, justificativa, realizado, tipo FROM projeto_custo";

async function runQuery(sql, params = []) {
  const [rows] = await pool.query(sql, params);
  return rows;
}

async function getAllprojeto_custo() {
  try {
    return await runQuery(baseSelect);
  } catch (error) {
    throw error;
  }
}

async function getprojeto_custoByNome(nome) {
  try {
    return await runQuery(
      `${baseSelect} WHERE descricao LIKE ? ORDER BY Id DESC`,
      [`%${nome}%`]
    );
  } catch (error) {
    throw error;
  }
}

async function getprojeto_custoByNomedelete(nome) {
  try {
    const registros = await runQuery(
      `${baseSelect} WHERE descricao = ? ORDER BY Id DESC`,
      [nome]
    );
    return registros[0];
  } catch (error) {
    throw error;
  }
}

async function insertprojeto_custo(registro) {
  try {
    await runQuery(
      'INSERT INTO projeto_custo (id_projeto, descricao, quantitativo, valor_unitario, justificativa, realizado, tipo) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [
        registro['id_projeto'] ?? null,
        registro['descricao'] ?? null,
        registro['quantitativo'] ?? null,
        registro['valor_unitario'] ?? null,
        registro['justificativa'] ?? null,
        registro['realizado'] ?? null,
        registro['tipo'] ?? null
      ]
    );
    const termoBusca = registro['descricao'] ?? '';
    return await getprojeto_custoByNome(termoBusca);
  } catch (error) {
    throw error;
  }
}

async function getprojeto_custoById(id) {
  try {
    const registros = await runQuery(`${baseSelect} WHERE Id = ?`, [id]);
    return registros[0];
  } catch (error) {
    throw error;
  }
}

async function deleteprojeto_custo(id) {
  try {
    await runQuery('DELETE FROM projeto_custo WHERE Id = ?', [id]);
  } catch (error) {
    throw error;
  }
}

async function updateprojeto_custo(id, registro) {
  try {
    await runQuery(
      'UPDATE projeto_custo SET id_projeto = ?, descricao = ?, quantitativo = ?, valor_unitario = ?, justificativa = ?, realizado = ?, tipo = ? WHERE Id = ?',
      [
        registro['id_projeto'] ?? null,
        registro['descricao'] ?? null,
        registro['quantitativo'] ?? null,
        registro['valor_unitario'] ?? null,
        registro['justificativa'] ?? null,
        registro['realizado'] ?? null,
        registro['tipo'] ?? null,
        id
      ]
    );
    return await getprojeto_custoById(id);
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getAllprojeto_custo,
  getprojeto_custoByNome,
  getprojeto_custoByNomedelete,
  insertprojeto_custo,
  getprojeto_custoById,
  deleteprojeto_custo,
  updateprojeto_custo
};