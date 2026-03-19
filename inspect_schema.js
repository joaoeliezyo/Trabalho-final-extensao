
require('dotenv').config();
const pool = require('./db');

async function inspect() {
    try {
        console.log('Inspecting tables...');

        const tables = ['Projeto_Extensao', 'Projeto_TipoAcao', 'Projeto_LinhaProgramatica'];

        for (const table of tables) {
            console.log(`\n--- ${table} ---`);
            const [columns] = await pool.execute(`DESCRIBE ${table}`);
            columns.forEach(col => {
                console.log(`${col.Field} (${col.Type})`);
            });
        }

        process.exit(0);
    } catch (err) {
        console.error('Error inspecting schema:', err);
        process.exit(1);
    }
}

inspect();
