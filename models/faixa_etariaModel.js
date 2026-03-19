// cursoModel.js
const pool = require('../db');  
async function getAllfaixa_etaria() {
 try {
 const [faixa_etaria] = await pool.query('SELECT id_faixa, descricao FROM faixa_etaria');
 return faixa_etaria;
 } catch (error) {
 throw error;
 }
}
async function getfaixa_etariaByNome(nome) {
 try {
 const [faixa_etaria] = await pool.query('SELECT * FROM faixa_etaria WHERE descricao LIKE ? order by id_faixa desc', [`%${nome}%`]);
 return faixa_etaria;
 } catch (error) {
 throw error;
 }
}
async function getfaixa_etariaByNomedelete(nome) {
 try {
 const [faixa_etaria] = await pool.query('SELECT * FROM faixa_etaria WHERE descricao = ? order by id_faixa desc', [nome]);
 return faixa_etaria[0];
 } catch (error) {
 throw error;
 }
} 

async function insertfaixa_etaria(descricao) {
 try {
 await pool.query('INSERT INTO faixa_etaria ( descricao) VALUES (?)',
[descricao]);
 const [faixa_etaria] = await pool.query('SELECT * FROM faixa_etaria WHERE descricao LIKE ?',
[`%${descricao}%`]);
 return faixa_etaria;
 } catch (error) {
 throw error;
 }
}

async function getfaixa_etariaById(id) {
 try {
 const [faixa_etaria] = await pool.query('SELECT * FROM faixa_etaria WHERE id_faixa = ?', [id]);
 return faixa_etaria[0];
 } catch (error) {
 throw error;
 }
} 

async function deletefaixa_etaria(id) {
 try {
 await pool.query('DELETE FROM faixa_etaria WHERE id_faixa = ?', [id]);
 } catch (error) {
 throw error;
 }
} 


async function  updatefaixa_etaria(id, descricao) {
 try {
 await pool.query('UPDATE faixa_etaria SET descricao = ? WHERE id_faixa = ?',
[descricao, id]);
 } catch (error) {
 throw error;
 }
} 

module.exports = {
 getAllfaixa_etaria,
 getfaixa_etariaByNome,
 getfaixa_etariaByNomedelete,
 insertfaixa_etaria,
 getfaixa_etariaById,
 deletefaixa_etaria,
 updatefaixa_etaria 
};






