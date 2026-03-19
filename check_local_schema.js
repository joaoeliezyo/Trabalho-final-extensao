
require('dotenv').config();
const pool = require('./db');

async function checkSchema() {
    try {
        console.log('Checking Local_Execucao schema...');
        const [columns] = await pool.execute('DESCRIBE Local_Execucao');
        columns.forEach(col => console.log(`${col.Field} (${col.Type})`));
        process.exit(0);
    } catch (err) {
        console.error('Error:', err);
        process.exit(1);
    }
}

checkSchema();
