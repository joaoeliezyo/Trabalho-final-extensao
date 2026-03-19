
require('dotenv').config();
const model = require('./models/local_execucaoModel');

async function debug() {
    try {
        console.log('Calling getAlllocal_execucao...');
        const result = await model.getAlllocal_execucao();
        console.log('Success!', result);
    } catch (err) {
        console.error('Error calling model:', err);
    }
    process.exit(0);
}

debug();
