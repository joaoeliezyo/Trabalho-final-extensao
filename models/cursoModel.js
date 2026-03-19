// cursoModel.js
const pool = require('../db');  
async function getAllCursos() {
 try {
 const [cursos] = await pool.query('SELECT id_curso, nome_curso FROM curso');
 return cursos;
 } catch (error) {
 throw error;
 }
}
async function getcursoByNome(nome) {
 try {
 const [cursos] = await pool.query('SELECT * FROM curso WHERE nome_curso LIKE ? order by id_curso desc', [`%${nome}%`]);
 return cursos;
 } catch (error) {
 throw error;
 }
}
async function getcursoByNomedelete(nome) {
 try {
 const [cursos] = await pool.query('SELECT * FROM curso WHERE nome_curso = ? order by id_curso desc', [nome]);
 return cursos[0];
 } catch (error) {
 throw error;
 }
} 

async function insertcurso(nome_curso) {
 try {
 await pool.query('INSERT INTO curso ( nome_curso) VALUES (?)',
[nome_curso]);
 const [curso] = await pool.query('SELECT * FROM curso WHERE nome_curso LIKE ?',
[`%${nome_curso}%`]);
 return curso;
 } catch (error) {
 throw error;
 }
}

async function getcursoById(id) {
 try {
 const [curso] = await pool.query('SELECT * FROM curso WHERE id_curso = ?', [id]);
 return curso[0];
 } catch (error) {
 throw error;
 }
} 

async function deletecurso(id) {
 try {
 await pool.query('DELETE FROM curso WHERE id_curso = ?', [id]);
 } catch (error) {
 throw error;
 }
} 


async function updateCurso(id, nome_curso) {
 try {
 await pool.query('UPDATE curso SET nome_curso = ? WHERE id_curso = ?',
[nome_curso, id]);
 } catch (error) {
 throw error;
 }
} 

module.exports = {
 getAllCursos,
 getcursoByNome,
 getcursoByNomedelete,
 insertcurso,
 getcursoById,
 deletecurso,
 updateCurso
};






