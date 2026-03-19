require('dotenv').config();
const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

async function setup() {
    console.log('--- Iniciando configuração do banco de dados ---');

    const baseConfig = {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT,
        multipleStatements: true
    };

    const dbName = process.env.DB_NAME;

    try {
        // ETAPA 1: Conexão sem banco definido — apenas para criá-lo
        console.log('1. Verificando/criando banco de dados...');
        const connInitial = await mysql.createConnection(baseConfig);
        
        // CORREÇÃO AQUI: Usando concatenação simples para evitar erro de sintaxe
        await connInitial.query('CREATE DATABASE IF NOT EXISTS ' + dbName + ';');
        await connInitial.end();
        console.log('Banco "' + dbName + '" verificado/criado.');

        // ETAPA 2: Nova conexão apontando diretamente para o banco
        console.log('2. Conectando ao banco para aplicar estrutura...');
        const connection = await mysql.createConnection({ ...baseConfig, database: dbName });

        const sqlPath = path.join(__dirname, 'projeto_extensao.sql');
        const sql = fs.readFileSync(sqlPath, 'utf8');

        console.log('3. Executando script SQL...');
        await connection.query(sql);
        console.log('Estrutura de tabelas aplicada com sucesso!');

        // ETAPA 3: Seed do usuário admin
        console.log('4. Verificando usuário admin...');
        // CORREÇÃO AQUI: A tabela Usuario usa 'id_usuario' e não 'id'
        const [rows] = await connection.query(
            'SELECT id_usuario FROM Usuario WHERE usuario = ?',
            ['admin']
        );

        if (rows.length === 0) {
            await connection.query(
                'INSERT INTO Usuario (usuario, senha, tipo) VALUES (?, ?, ?)',
                ['admin', 'admin123', 'admin']
            );
            console.log('Usuário admin criado: admin / admin123');
        } else {
            console.log('Usuário admin já existe.');
        }

        await connection.end();
        console.log('--- Configuração concluída com sucesso! ---');

    } catch (err) {
        console.error(' Erro na configuração:', err.message);
        process.exit(1);
    }
}

setup();
