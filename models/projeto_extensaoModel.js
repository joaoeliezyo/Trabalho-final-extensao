// projeto_extensaolModel.js
const pool = require('../db');

// Lista todos os projetos de extensao com os principais campos da tabela
async function getAllprojeto_extensaos() {
  try {
    const [projeto_extensaos] = await pool.query(
      'SELECT id_projeto, titulo, id_tipo_plano, coordenador_id, periodo_inicio, periodo_fim, carga_horaria_total, id_publico_alvo, objetivo, metodologia FROM projeto_extensao'
    );
    return projeto_extensaos;
  }
  catch (error) {
    throw error;
  }
}

async function getprojeto_extensaosByNome(nome) {
  try {
    const [projeto_extensaos] = await pool.query(
      'SELECT * FROM projeto_extensao WHERE titulo LIKE ? ORDER BY id_projeto DESC',
      [`%${nome}%`]
    );
    return projeto_extensaos;
  } catch (error) {
    throw error;
  }
}

async function getprojeto_extensaosByNomedelete(nome) {
  try {
    const [projeto_extensaos] = await pool.query(
      'SELECT * FROM projeto_extensao WHERE titulo = ? ORDER BY id_projeto DESC',
      [nome]
    );
    return projeto_extensaos;
  } catch (error) {
    throw error;
  }
}

async function insertprojeto_extensaos(registro) {
  try {
    await pool.query(
      'INSERT INTO projeto_extensao (id_projeto, titulo, id_tipo_plano, coordenador_id, periodo_inicio, periodo_fim, carga_horaria_total, id_publico_alvo, objetivo, metodologia) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [
        registro.id_projeto ?? null,
        registro.titulo ?? null,
        registro.id_tipo_plano ?? null,
        registro.coordenador_id ?? null,
        registro.periodo_inicio ?? null,
        registro.periodo_fim ?? null,
        registro.carga_horaria_total ?? null,
        registro.id_publico_alvo ?? null,
        registro.objetivo ?? null,
        registro.metodologia ?? null
      ]
    );

    const termoBusca = registro.titulo ?? '';
    const [projeto_extensaos] = await pool.query(
      'SELECT * FROM projeto_extensao WHERE titulo LIKE ? ORDER BY id_projeto DESC',
      [`%${termoBusca}%`]
    );
    return projeto_extensaos;
  } catch (error) {
    throw error;
  }
}

async function getprojeto_extensaosById(id) {
  try {
    const [projeto_extensaos] = await pool.query(
      'SELECT * FROM projeto_extensao WHERE id_projeto = ?',
      [id]
    );
    return projeto_extensaos[0];
  } catch (error) {
    throw error;
  }
}

async function deleteprojeto_extensaos(id) {
  try {
    await pool.query(
      'DELETE FROM projeto_extensao WHERE id_projeto = ?',
      [id]
    );
  } catch (error) {
    throw error;
  }
}

async function updateprojeto_extensaos(id, registro) {
  try {
    await pool.query(
      'UPDATE projeto_extensao SET titulo = ?, id_tipo_plano = ?, coordenador_id = ?, periodo_inicio = ?, periodo_fim = ?, carga_horaria_total = ?, id_publico_alvo = ?, objetivo = ?, metodologia = ? WHERE id_projeto = ?',
      [
        registro.titulo ?? null,
        registro.id_tipo_plano ?? null,
        registro.coordenador_id ?? null,
        registro.periodo_inicio ?? null,
        registro.periodo_fim ?? null,
        registro.carga_horaria_total ?? null,
        registro.id_publico_alvo ?? null,
        registro.objetivo ?? null,
        registro.metodologia ?? null,
        id
      ]
    );

    return await getprojeto_extensaosById(id);
  } catch (error) {
    throw error;
  }
}

// --- Relationship Helpers ---

async function getTipoAcaoByProjeto(id_projeto) {
  const [rows] = await pool.query('SELECT * FROM Projeto_TipoAcao WHERE id_projeto = ?', [id_projeto]);
  return rows;
}

async function getLinhaProgramaticaByProjeto(id_projeto) {
  const [rows] = await pool.query('SELECT * FROM Projeto_LinhaProgramatica WHERE id_projeto = ?', [id_projeto]);
  return rows;
}

async function updateTipoAcaoProjeto(id_projeto, itens) {
  // itens = [{ id_acao, valor }]
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    await connection.query('DELETE FROM Projeto_TipoAcao WHERE id_projeto = ?', [id_projeto]);
    if (itens && itens.length > 0) {
      for (const item of itens) {
        await connection.query(
          'INSERT INTO Projeto_TipoAcao (id_projeto, id_acao, valor) VALUES (?, ?, ?)',
          [id_projeto, item.id_acao, item.valor]
        );
      }
    }
    await connection.commit();
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}

async function updateLinhaProgramaticaProjeto(id_projeto, itens) {
  // itens = [{ id_linha, valor }]
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    await connection.query('DELETE FROM Projeto_LinhaProgramatica WHERE id_projeto = ?', [id_projeto]);
    if (itens && itens.length > 0) {
      for (const item of itens) {
        await connection.query(
          'INSERT INTO Projeto_LinhaProgramatica (id_projeto, id_linha, valor) VALUES (?, ?, ?)',
          [id_projeto, item.id_linha, item.valor]
        );
      }
    }
    await connection.commit();
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}

module.exports = {
  getAllprojeto_extensaos,
  getprojeto_extensaosByNome,
  getprojeto_extensaosByNomedelete,
  insertprojeto_extensaos,
  getprojeto_extensaosById,
  deleteprojeto_extensaos,
  deleteprojeto_extensaos,
  updateprojeto_extensaos,
  getTipoAcaoByProjeto,
  getLinhaProgramaticaByProjeto,
  updateTipoAcaoProjeto,
  updateLinhaProgramaticaProjeto
};
