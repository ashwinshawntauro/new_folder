const pool = require("./db");
const bcrypt = require("bcryptjs");

async function createTestUser() {
    try {
        // First check if users exist and update their passwords
        const users = [
            { username: "Amrutha", password: "Amrutha@123", is_admin: false },
            { username: "admin", password: "Zosh@2021", is_admin: true }
        ];

        for (let user of users) {
            // Check if user exists
            const existingUser = await pool.query(
                "SELECT * FROM users WHERE user_name = $1",
                [user.username]
            );

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(user.password, salt);

            if (existingUser.rows.length > 0) {
                // Update existing user's password
                await pool.query(
                    "UPDATE users SET user_password = $1 WHERE user_name = $2",
                    [hashedPassword, user.username]
                );
                console.log(`Updated password for user: ${user.username}`);
            } else {
                // Create new user
                await pool.query(
                    "INSERT INTO users (user_name, user_password, is_admin) VALUES ($1, $2, $3)",
                    [user.username, hashedPassword, user.is_admin]
                );
                console.log(`Created new user: ${user.username}`);
            }
        }

         // Verify the users
         const allUsers = await pool.query("SELECT user_name, is_admin, user_password FROM users");
         console.log("\nUsers in database:", allUsers.rows.map(u => ({
             username: u.user_name,
             is_admin: u.is_admin,
             password_hash: u.user_password.substring(0, 20) + "..." // Show partial hash for verification
         })));
 
         console.log("\nUser setup completed successfully!");
         console.log("\nYou can login with either:");
         console.log("Username: Amrutha");
         console.log("Password: Amrutha@123");
         console.log("\nOR");
         console.log("Username: admin");
         console.log("Password: Zosh@2021");

    } catch (err) {
        console.error("Error:", err.message);
    } finally {
        await pool.end();
    }
}

// Run the function
createTestUser();