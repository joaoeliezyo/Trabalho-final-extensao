// avaliacao_institucionalModel.js gerado automaticamente para a tabela avaliacao_institucional.
 const pool = require('../db');

function runQuery(sql, params = []) {
  const connection = pool;
  return new Promise((resolve, reject) => {
    connection.query(sql, params, (error, results) => {
      if (error) {
        return reject(error);
      }
      resolve(results); 
    });
  });
}

async function getAllAvaliacao_institucional() {
  try {
    return await runQuery('SELECT id_avaliacao, id_projeto, criterios_avaliacao, metodologia_avaliacao, forma_apresentacao_relatorio FROM avaliacao_institucional');
  } catch (error) {
    throw error;
  }
}

async function getAvaliacao_institucionalByNome(nome) {
  try {
    return await runQuery(
      'SELECT * FROM avaliacao_institucional WHERE criterios_avaliacao LIKE ? ORDER BY id_avaliacao DESC',
      ['%' + nome + '%']
    );
  } catch (error) {
    throw error;
  }   
}

async function getAvaliacao_institucionalByNomedelete(nome) {
  try {
    const registros = await runQuery(
      'SELECT * FROM avaliacao_institucional WHERE criterios_avaliacao = ? ORDER BY id_avaliacao DESC',
      [nome]
    );
    return registros[0];
  } catch (error) {
    throw error;
  }
} 

async function insertAvaliacao_institucional(registro) {
  try {
    await runQuery(
      'INSERT INTO avaliacao_institucional (id_projeto, criterios_avaliacao, metodologia_avaliacao, forma_apresentacao_relatorio) VALUES (?, ?, ?, ?)',
      [registro['id_projeto'] ?? null, registro['criterios_avaliacao'] ?? null, registro['metodologia_avaliacao'] ?? null, registro['forma_apresentacao_relatorio'] ?? null]
    );
    const termoBusca = registro['criterios_avaliacao'] ?? '';
    return await getAvaliacao_institucionalByNome(termoBusca);
  } catch (error) {
    throw error;
  }
}

async function getAvaliacao_institucionalById(id) {
  try {
    const registros = await runQuery(
      'SELECT * FROM avaliacao_institucional WHERE id_avaliacao = ?',
      [id]
    );
    return registros[0];
  } catch (error) {
    throw error;
  }
}

async function deleteAvaliacao_institucional(id) {
  try {
    await runQuery(
      'DELETE FROM avaliacao_institucional WHERE id_avaliacao = ?',
      [id]
    );
  } catch (error) {
    throw error;
  }
}

async function updateAvaliacao_institucional(id, registro) {
  try {
    await runQuery(
      'UPDATE avaliacao_institucional SET id_projeto = ?, criterios_avaliacao = ?, metodologia_avaliacao = ?, forma_apresentacao_relatorio = ? WHERE id_avaliacao = ?',
      [registro['id_projeto'] ?? null, registro['criterios_avaliacao'] ?? null, registro['metodologia_avaliacao'] ?? null, registro['forma_apresentacao_relatorio'] ?? null, id]
    );
    return await getAvaliacao_institucionalById(id);
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getAllAvaliacao_institucional,
  getAvaliacao_institucionalByNome,
  getAvaliacao_institucionalByNomedelete,
  insertAvaliacao_institucional,
  getAvaliacao_institucionalById,
  deleteAvaliacao_institucional,
  updateAvaliacao_institucional
};

