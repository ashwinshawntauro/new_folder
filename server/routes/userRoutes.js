const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const pool = require('../db');
const { authorization } = require('../middleware/authorization'); // Add this import

// Add authorization middleware to all routes
router.use(authorization);

// Get all users
router.get('/users', async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT user_name as username, role, is_active FROM users ORDER BY user_name'
        );
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Failed to fetch users' });
    }
});

// Add new user
router.post('/users', async (req, res) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const { username,password, role } = req.body;


        // Validate input
        if (!username || !password || !role) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Check if username already exists
        const userExists = await client.query(
            'SELECT user_name FROM users WHERE user_name = $1',
            [username]
        );

        if (userExists.rows.length > 0) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Insert new user
        const result = await client.query(
            'INSERT INTO users (user_name, user_password, role, is_active) VALUES ($1, $2, $3, true) RETURNING user_name, role, is_active',
            [username, hashedPassword, role]
        );

        await client.query('COMMIT');
        res.status(201).json(result.rows[0]);
    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Failed to create user' });
    } finally {
        client.release();
    }
});

// Deactivate user
router.put('/users/deactivate', async (req, res) => {
    try {
        const { username } = req.body;
        

        const result = await pool.query(
            'UPDATE users SET is_active = false WHERE user_name = $1 RETURNING user_name as username, role, is_active',
            [username]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error deactivating user:', error);
        res.status(500).json({ message: 'Failed to deactivate user' });
    }
});

// Update user password
router.put('/users/update-password', async (req, res) => {
    try {
        const { username, user_password } = req.body;
        

        // Hash new password
        const hashedPassword = await bcrypt.hash(user_password, 10);


        const result = await pool.query(
            'UPDATE users SET user_password = $1 WHERE user_name = $2 RETURNING user_name as username, role, is_active',
            [hashedPassword, username]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error updating password:', error);
        res.status(500).json({ message: 'Failed to update password' });
    }
});

// Activate user
router.put('/users/activate', async (req, res) => {
    try {
        const { username } = req.body;
        
        const result = await pool.query(
            'UPDATE users SET is_active = true WHERE user_name = $1 RETURNING user_id, user_name, role, is_active',
            [username]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error activating user:', error);
        res.status(500).json({ message: 'Failed to activate user' });
    }
});

// Update user role
router.put('/users/update-role', async (req, res) => {
    try {
        const { username, role } = req.body;
        
        if (!['admin', 'supervisor', 'user'].includes(role)) {
            return res.status(400).json({ message: 'Invalid role' });
        }

        const result = await pool.query(
            'UPDATE users SET role = $1 WHERE user_name = $2 RETURNING user_id, user_name, role, is_active',
            [role, username]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error updating role:', error);
        res.status(500).json({ message: 'Failed to update role' });
    }
});

module.exports = router;