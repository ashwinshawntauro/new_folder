const pool = require("./db");

async function testConnection() {
    try {
        const result = await pool.query('SELECT * FROM users');
        console.log('Connection successful!');
        console.log('Existing users:', result.rows);
    } catch (err) {
        console.error('Error connecting to database:', err.message);
    } finally {
        await pool.end();
    }
}

testConnection();