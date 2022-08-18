
//Database info exporter 
module.exports = {
    host: "localhost",
    user: "root",
    password: "1234",
    database: "library",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
} ;