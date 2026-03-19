// projeto_assinaturaModel.js gerado automaticamente para a tabela projeto_assinatura.
const pool = require('../db');  

const baseSelect = 'SELECT 	pa.id ,	pa.ordem,	pa.id_pessoa ,	pa.id_projeto ,	pa.data_hora ,	pa.Assinatura ,	pe.titulo,	p.nome ,	p.cpf from projeto_assinatura pa inner join projeto_extensao pe  on pe.id_projeto  = pa.id_projeto inner join pessoa p on p.id_pessoa  =  pa.id_pessoa ';

function criar_assinatura(id_projeto, id_pessoa, dia, mes, horas, minutos, segundos, ano) {
  const chave1 = id_projeto % 2 === 0 ? 'A1' : 'A9';
  const chave2 = id_pessoa % 2 === 0 ? 'A2' : 'A8';
  const chave3 = segundos % 2 === 0 ? 'A3' : 'A7';
  const chave4 = segundos % 2 === 0 ? 'A3' : 'A7';

  const partes = [
    id_projeto,
    chave1,
    id_pessoa,
    chave2,
    dia,
    chave3,
    mes,
    horas,
    chave3,
    minutos,
    ano,
    chave4
  ];

  return partes.join('');
}

async function getAllProjeto_assinatura() {
  try {
    const [rows] = await pool.query(baseSelect);
    return rows;
  } catch (error) {
    throw error;
  }
}

async function getProjeto_assinaturaByNome(nome) {
  try {
    const [rows] = await pool.query(
      `${baseSelect} WHERE Assinatura LIKE ? `,
      ['%' + nome + '%']
    );
    return rows;
  } catch (error) {
    throw error;
  }
}

async function getProjeto_assinaturaByNomedelete(nome) {
  try {
    const [registros] = await pool.query(
      `${baseSelect} WHERE Assinatura = ? `,
      [nome]
    );
    return registros[0];
  } catch (error) {
    throw error;
  }
}

async function insertProjeto_assinatura(registro, sessionUsuario = {}) {
  try {
    const agora = new Date();
 console.log(agora);
    const dia = agora.getDate();              // Dia do mes (1-31)
    const mes = agora.getMonth() + 1;         // Mes (0-11, por isso soma +1)
    const ano = agora.getFullYear();          // Ano completo (ex: 2025)
    const horas = agora.getHours();           // Horas (0-23)
    const minutos = agora.getMinutes();       // Minutos (0-59)
    const segundos = agora.getSeconds();      // Segundos (0-59)

    const id_pessoa = sessionUsuario.id_pessoa ?? null;
    if (id_pessoa === null) {
      throw new Error('id_pessoa da sessao nao informado para criar assinatura');
    }

    const assinatura = criar_assinatura(
      registro['id_projeto'] ?? 0,
      id_pessoa ?? 0,
      dia,
      mes,
      horas,
      minutos,
      segundos,
      ano
    );

    await pool.query(
      'INSERT INTO projeto_assinatura (id_projeto, id_pessoa, Assinatura, data_hora, ordem) VALUES (?, ?, ?, ?, ?)',
      [registro['id_projeto'] ?? null, id_pessoa, assinatura, agora, registro['ordem'] ?? null]
    );
    const termoBusca = assinatura;
    return await getProjeto_assinaturaByNome(termoBusca);
  } catch (error) {
    throw error;
  }
}

async function getProjeto_assinaturaById(id) {
  try {
    const [registros] = await pool.query(
      `${baseSelect} WHERE id = ?`,
      [id]
    );
    return registros[0];
  } catch (error) {
    throw error;
  }
}

async function getProjeto_assinaturaByProjeto(id_projeto) {
  try {
    const [rows] = await pool.query(
      `${baseSelect} WHERE pa.id_projeto = ? ORDER BY pa.data_hora ASC`,
      [id_projeto]
    );
    return rows;
  } catch (error) {
    throw error;
  }
}

async function getResumoAssinaturasByProjeto(id_projeto) {
  try {
    const [rows] = await pool.query(
      'SELECT COUNT(*) AS total_assinaturas, MIN(data_hora) AS primeira_data FROM projeto_assinatura WHERE id_projeto = ?',
      [id_projeto]
    );
    return rows[0] ?? { total_assinaturas: 0, primeira_data: null };
  } catch (error) {
    throw error;
  }
}

async function getResumoAssinaturasTodosProjetos() {
  try {
    const [rows] = await pool.query(
      'SELECT id_projeto, COUNT(*) AS total_assinaturas, MIN(data_hora) AS primeira_data FROM projeto_assinatura GROUP BY id_projeto'
    );
    return rows;
  } catch (error) {
    throw error;
  }
}

async function deleteProjeto_assinatura(id) {
  try {
    await pool.query(
      'DELETE FROM projeto_assinatura WHERE id = ?',
      [id]
    );
  } catch (error) {
    throw error;
  }
}

async function updateProjeto_assinatura(id, registro) {
  try {
    await pool.query(
      'UPDATE projeto_assinatura SET id_projeto = ?, id_pessoa = ?, Assinatura = ?, data_hora = ?, ordem = ? WHERE id = ?',
      [registro['id_projeto'] ?? null, registro['id_pessoa'] ?? null, registro['Assinatura'] ?? null, registro['data_hora'] ?? null, registro['ordem'] ?? null, id]
    );
    return await getProjeto_assinaturaById(id);
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getAllProjeto_assinatura,
  getProjeto_assinaturaByNome,
  getProjeto_assinaturaByNomedelete,
  insertProjeto_assinatura,
  getProjeto_assinaturaById,
  getProjeto_assinaturaByProjeto,
  getResumoAssinaturasByProjeto,
  getResumoAssinaturasTodosProjetos,
  deleteProjeto_assinatura,
  updateProjeto_assinatura
};