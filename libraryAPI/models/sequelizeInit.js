
//Sequelize and Model Loader
//Author: Diwas Adhikari

const seq = require("sequelize") ;
const dbConfig = require("../config/dbConfig.js");
const seqObj = new seq(dbConfig.database, dbConfig.user, dbConfig.password, {
                    host: dbConfig.host,
                    dialect: dbConfig.dialect,
                    operatorsAliases: false,
                    dialectOptions: {
                        socketPath: '/var/run/mysqld/mysqld.sock'
                    },
                    pool:{
                        max: dbConfig.pool.max,
                        min: dbConfig.pool.min,
                        acquire: dbConfig.pool.acquire,
                        idle: dbConfig.pool.idle 
                    }
                }) ;

const database = {} ;
database.seq = seq ;
database.seqObj = seqObj ;

//Models
database.books = require("./books.js")(seqObj, seq) ;
database.pubs = require("./publications.js")(seqObj, seq) ;
database.users = require("./users.js")(seqObj, seq) ;
database.issues = require("./issues.js")(seqObj, seq) ;
database.publish = require("./published.js")(seqObj, seq) ;

//Associations
database.users.hasMany(database.issues, {onDelete: "cascade"}) ;
database.books.hasMany(database.issues, {onDelete: "cascade"}) ;
database.pubs.hasMany(database.publish, {onDelete: "cascade"}) ;
database.books.hasMany(database.publish, {onDelete: "cascade"}) ;
database.issues.belongsTo(database.users) ;
database.issues.belongsTo(database.books) ;
database.publish.belongsTo(database.pubs) ;
database.publish.belongsTo(database.books) ;

//Exporting database object with its properties..........
module.exports = database ;