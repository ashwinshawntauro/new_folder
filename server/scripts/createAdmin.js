const bcrypt = require('bcrypt');
const pool = require('../db/db');

async function createAdminUser() {
    try {
        // Generate hashed password
        const password = 'admin123';
        const hashedPassword = await bcrypt.hash(password, 10);

        // Check if admin user already exists
        const checkUser = await pool.query(
            'SELECT * FROM users WHERE username = $1',
            ['admin']
        );

        if (checkUser.rows.length > 0) {
            console.log('Admin user already exists!');
            await pool.end();
            return;
        }

        // Create admin user
        const result = await pool.query(
            'INSERT INTO users (username, password, role, is_active) VALUES ($1, $2, $3, $4) RETURNING username, role',
            ['admin', hashedPassword, 'admin', true]
        );

        console.log('Admin user created successfully:');
        console.log(result.rows[0]);
        
        // Close the database connection
        await pool.end();
    } catch (error) {
        console.error('Error creating admin user:', error);
        await pool.end();
    }
}

// Run the function
createAdminUser(); 