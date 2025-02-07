const Pool = require("pg").Pool;

const pool = new Pool({
    user:"postgres",
    password:"12ashwin",
    host:"localhost",
    port:5432,
    database:"logindb"
})

module.exports = pool;