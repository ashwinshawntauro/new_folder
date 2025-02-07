const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../db");

const refreshTokens = []; // Store refresh tokens in memory (use a database in production)

router.post("/login", async (req, res) => {
  try {
    console.log("Login attempt with:", req.body); // Debug log
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required" });
    }

    // Check if user exists
    const userResult = await pool.query(
      "SELECT * FROM users WHERE user_name = $1",
      [username]
    );

    console.log(
      "User query result:",
      userResult.rows.length ? "User found" : "User not found"
    ); // Debug log

    if (userResult.rows.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const user = userResult.rows[0];

    // Check if user is active
    if (!user.is_active) {
      return res.status(401).json({ message: "Account is deactivated" });
    }

    // Verify password
    const hashedPassword = await bcrypt.hash(user.user_password, 10);
    const validPassword = await bcrypt.compare(password, hashedPassword);
    console.log("Password validation:", validPassword ? "Success" : "Failed"); // Debug log

    if (!validPassword) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Create JWT token
    const token = jwt.sign(
      {
        id: user.user_id,
        username: user.user_name,
        role: user.role,
      },
      process.env.JWT_SECRET || "Zosh@2021", // Ensure this matches
      { expiresIn: "24h" }
    );

    // Create refresh token
    const refreshToken = jwt.sign(
      { id: user.user_id },
      process.env.JWT_SECRET || "Zosh@2021",
      { expiresIn: "7d" } // Set a longer expiration for refresh token
    );

    // Store refresh token (in a database in production)
    refreshTokens.push(refreshToken);

    res.json({
      token,
      refreshToken, // Send refresh token to client
      user: {
        username: user.user_name,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/token", (req, res) => {
  const { token } = req.body;
  if (!token || !refreshTokens.includes(token)) {
    return res.status(403).json({ message: "Refresh token is not valid" });
  }

  jwt.verify(token, process.env.JWT_SECRET || "Zosh@2021", (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Refresh token is not valid" });
    }

    // Create new access token
    const newToken = jwt.sign(
      {
        id: user.id,
        username: user.username,
        role: user.role,
      },
      process.env.JWT_SECRET || "Zosh@2021",
      { expiresIn: "24h" }
    );

    res.json({ token: newToken });
  });
});

module.exports = router;
