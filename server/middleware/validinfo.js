module.exports = (req, res, next) => {
    const { user_name, user_password } = req.body;

    if (!user_name || !user_password) {
        return res.status(400).json({ msg: "Please enter both username and password" });
    }

    // Proceed to the next middleware or route handler if everything is valid
    next();
};
