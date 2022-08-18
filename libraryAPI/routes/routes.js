//Router for URL routing/paging
//Author: Diwas Adhikari

const issues = require("../models/issues.js");

module.exports = app => {
    const books = require("../controllers/bookController.js");
    const users = require("../controllers/userController.js");
    const pubs = require("../controllers/pubController.js");
  
    var router = require("express").Router();

    //------------------------------ Home and Login Routes --------------------------
    router.get('/home', (req, res)=>{
      res.render('home.ejs', {errs: []});
    });
    router.get('/about', (req, res)=>{
      res.render('about.ejs', {errs: []});
    });
    router.get('/login', (req, res)=>{
      res.render('logAndSign.ejs', {errs: []});
    });
  
    //router.post('/login', users.authenticate);

    //--------------------------------- Book Routes ------------------------------------
    // Create a new book
    router.post("/books", books.createBook);
  
    // Retrieve all books
    router.get("/books", books.fetchAllBooks);
    router.get("/books/available", books.fetchAvailableBooks);
    router.get("/books/genre", books.fetchAllBooksFromGenre);
  
    // Retrieve a single book with id
    router.get("/books/:id", books.fetchSingleBook);
  
    // Update a book with id
    router.put("/books/:id", books.updateBook);
  
    // Delete a book with id
    router.delete("/books/:id", books.deleteSingleBook);
  
    // Delete all books
    router.delete("/books", books.deleteAllBooks);

 //--------------------------------- Publication Routes ------------------------------------
    // Create a new publication
    router.post("/pubs", pubs.createPub);
  
    // Retrieve all publications
    router.get("/pubs", pubs.fetchAllPubs);
  
    // Retrieve a single publication with id
    router.get("/pubs/:id", pubs.fetchSinglePub);
  
    // Update a publication with id
    router.put("/pubs/:id", pubs.updatePub);
  
    // Delete a publication with id
    router.delete("/pubs/:id", pubs.deleteSinglePub);
  
    // Delete all publications
    router.delete("/pubs", pubs.deleteAllPubs);

    //-------------------------------- User Routes --------------------------------------
    // Create a new user
    router.post("/users", users.createUser);
  
    // Retrieve all users
    router.get("/users", users.fetchAllUsers);
  
    // Retrieve a single user with id
    router.get("/users/:id", users.fetchSingleUser);
  
    // Update an user with id
    router.put("/users/:id", users.updateUser);
  
    // Delete an user with id
    router.delete("/users/:id", users.deleteSingleUser);
  
    // Delete all users
    router.delete("/users", users.deleteAllUsers);
  
    //-------------------------------- User Issue Routes --------------------------------------
    // Create a new user
    router.post("/users/:id/issue", users.createIssue);

    router.get("/users/:id/issue", users.fetchIssues);

    router.delete("/users/:id/issue/:issue", users.deleteIssue);

    app.use('/lib-api', router);

    //-------------------------------- Published Record Routes --------------------------------------
    // Create a new user
    router.post("/users/:id/rec", pubs.createPublish);

    router.get("/users/:id/rec", pubs.fetchPublish);

    router.delete("/users/:id/rec/:publ", pubs.deletePublish);

    app.use('/lib-api', router);
  };