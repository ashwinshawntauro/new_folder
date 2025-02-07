const pool = require("./db");
const bcrypt = require("bcryptjs");

async function resetAdmin() {
    try {
        // First check if is_admin column exists
        try {
            await pool.query(`
                SELECT is_admin FROM users LIMIT 1;
            `);
        } catch (err) {
            console.log("Adding is_admin column...");
            await pool.query(`
                ALTER TABLE users 
                ADD COLUMN IF NOT EXISTS is_admin BOOLEAN DEFAULT false,
                ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true,
                ADD COLUMN IF NOT EXISTS created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            `);
        }

        // Delete existing admin
        await pool.query("DELETE FROM users WHERE user_name = 'admin'");

        // Create new admin with fresh password hash
        const password = "Zosh@2021";
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Insert new admin
        const newAdmin = await pool.query(
            "INSERT INTO users (user_name, user_password, is_admin, is_active, role) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            ["admin", hashedPassword, true, true, "admin"]
        );

        // Verify the admin user
        console.log("\nAdmin user created successfully!");
        console.log("Username: admin");
        console.log("Password: Zosh@2021");
        console.log("Is admin:", newAdmin.rows[0].is_admin);
        console.log("Is active:", newAdmin.rows[0].is_active);
        console.log("Role:", newAdmin.rows[0].role);

        // Test the password
        const validPassword = await bcrypt.compare(password, newAdmin.rows[0].user_password);
        console.log("Password verification test:", validPassword ? "PASSED" : "FAILED");

    } catch (err) {
        console.error("Error:", err.message);
    } finally {
        await pool.end();
    }
}

// Run the function
resetAdmin();