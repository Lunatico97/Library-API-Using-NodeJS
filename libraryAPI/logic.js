//Server Side
//Author: Diwas Adhikari

//Load all the modules
const express = require('express') ;
const mysql = require('mysql') ;
const bodyParser = require('body-parser') ;
const cors = require('cors') ;
const database = require("./models/sequelizeInit.js") ;

//Initialization
const app = express() ;
const port = 5000 || process.env.PORT ;

app.use('/css', express.static(__dirname + '/css'));
app.use('/images', express.static(__dirname + '/images'));
app.use(cors({origin: "http://localhost:3000"})) ;

app.use(express.urlencoded({extended: true})) ;
app.use(express.json()) ;

//Views are loaded in .ejs formats
app.set('view engine', 'ejs') ;
app.engine('ejs', require('ejs').__express);

database.seqObj.sync()
.then(() => {
    console.log("Synced database !!!");
})
.catch((err) => {
    console.log("Failed to sync database: " + err.message);
});

/*
database.seqObj.sync({force: true}).then(()=>{
    console.log("Re-syncing database....") ;
}) ;
*/

//Default Route
app.get("/lib-api", (req, res) => {
   
});

require("./routes/routes.js")(app);

//Listen to default DB port
app.listen(port, (err)=>{
    if(err){
        console.log(err) ;
    }
    else{
        console.log(`Listening to port: ${port}`) ;
    }
}) ;