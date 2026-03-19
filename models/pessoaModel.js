// pessoaModel.js
const pool = require('../db');

// Lista todos os projetos de extensao com os principais campos da tabela
async function getAllpessoas() {
  try {
  const [pessoas] = await pool.query(
    'SELECT id_pessoa, nome, cpf, email, telefone, id_tipo_pessoa FROM pessoa'
  );
  return pessoas;
  }
  catch(error){
    throw error;
  }
}

async function getpessoasByNome(nome)  {
  try {
  const [pessoas] = await pool.query(
    'SELECT * FROM pessoa WHERE nome LIKE ? ORDER BY id_pessoa DESC',
    [`%${nome}%`]
  );
  return pessoas;
  } catch (error) {
 throw error;
 }
}

async function getpessoasByNomedelete(nome)  {
  try {
  const [pessoas] = await pool.query(
    'SELECT * FROM pessoa WHERE nome = ? ORDER BY id_pessoa DESC',
    [nome]
  );
 return pessoas;
  } catch (error) {
 throw error;
 }
}

async function insertpessoas(registro) {
  try {
  await pool.query(
    'INSERT INTO pessoa (nome, cpf, email, telefone, id_tipo_pessoa) VALUES (?, ?, ?, ?, ?)',
    [
      registro.nome ?? null,
      registro.cpf ?? null,
      registro.email ?? null,
      registro.telefone ?? null,
      registro.id_tipo_pessoa ?? null,
    ]
  );

  const termoBusca = registro.nome ?? '';
  const [pessoas] = await pool.query(
    'SELECT * FROM pessoa WHERE nome LIKE ? ORDER BY id_pessoa DESC',
    [`%${termoBusca}%`]
  );
  return pessoas;
 } catch (error) {
 throw error;
 }
}

async function getpessoasById(id)  {
 try {
 const [pessoas] = await pool.query(
    'SELECT * FROM pessoa WHERE id_pessoa = ?',
    [id]
  );
  return pessoas[0];
 } catch (error) {
 throw error;
 }
} 

async function deletepessoas(id) {
  try {
  await pool.query(
    'DELETE FROM pessoa WHERE id_pessoa = ?',
    [id]
  );
} catch (error) {
 throw error;
}
}

async function updatepessoas(id, registro) {
  try {
  await pool.query(
    'UPDATE pessoa SET nome = ?, cpf = ?, email = ?, telefone = ?, id_tipo_pessoa = ? WHERE id_pessoa = ?',
    [
      registro.nome ?? null,
      registro.cpf ?? null,
      registro.email ?? null,
      registro.telefone ?? null,
      registro.id_tipo_pessoa ?? null,
      id
    ]
  );

  return await getpessoasById(id);    
} catch (error) {
 throw error;
}
}

module.exports = {  
  getAllpessoas,    
  getpessoasByNome,
  getpessoasByNomedelete,
  insertpessoas,
  getpessoasById,
  deletepessoas,
  updatepessoas
};
