// escolaridadeModel.js
const pool = require('../db');  
async function getAllescolaridade() {
 try {
 const [escolaridade] = await pool.query('SELECT id_escolaridade, descricao FROM escolaridade');
 return escolaridade;
 } catch (error) {
 throw error;
 }
}
async function getescolaridadeByNome(nome) {
 try {
 const [escolaridade] = await pool.query('SELECT * FROM escolaridade WHERE descricao LIKE ? order by id_escolaridade desc', [`%${nome}%`]);
 return escolaridade;
 } catch (error) {
 throw error;
 }
}
async function getescolaridadeByNomedelete(nome) {
 try {
 const [escolaridade] = await pool.query('SELECT * FROM escolaridade WHERE descricao = ? order by id_escolaridade desc', [nome]);
 return escolaridade[0];
 } catch (error) {
 throw error;
 }
} 

async function insertescolaridade(descricao) {
 try {
 await pool.query('INSERT INTO escolaridade ( descricao) VALUES (?)',
[descricao]);
 const [escolaridade] = await pool.query('SELECT * FROM escolaridade WHERE descricao LIKE ?',
[`%${descricao}%`]);
 return escolaridade;
 } catch (error) {
 throw error;
 }
}

async function getescolaridadeById(id) {
 try {
 const [escolaridade] = await pool.query('SELECT * FROM escolaridade WHERE id_escolaridade = ?', [id]);
 return escolaridade[0];
 } catch (error) {
 throw error;
 }
} 

async function deleteescolaridade(id) {
 try {
 await pool.query('DELETE FROM escolaridade WHERE id_escolaridade = ?', [id]);
 } catch (error) {
 throw error;
 }
} 


async function  updateescolaridade(id, descricao) {
 try {
 await pool.query('UPDATE escolaridade SET descricao = ? WHERE id_escolaridade = ?',
[descricao, id]);
 } catch (error) {
 throw error;
 }
} 

module.exports = {
 getAllescolaridade,
 getescolaridadeByNome,
 getescolaridadeByNomedelete,
 insertescolaridade,
 getescolaridadeById,
 deleteescolaridade,
 updateescolaridade 
};






