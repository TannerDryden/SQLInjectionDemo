const Pool = require("pg").Pool;

const pool =  new Pool({
    user: "postgres",
    password: "tddryden",
    port: 5432,
    host: "localhost",
    database: "unsecuredatabase",
});

module.exports = pool;