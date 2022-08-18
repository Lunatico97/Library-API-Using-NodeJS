//Controller for making functions as per the models exported later for routing
//Author: Diwas Adhikari

const database = require("../models/sequelizeInit.js");
const books = database.books;
const op = database.seq.Op;

// Create book entries
exports.createBook = (req, res) => {
  // I don't want blank data !
  if (!req.body.title) {
    res.status(400).send({
      message: "Don't leave empty data!"
    });
    return;
  }

  // Create a book object
  const book = {
    title: req.body.title,
    author: req.body.author,
    genre: req.body.genre,
    publisher: req.body.publisher,
    ISBN: req.body.ISBN,
    availability: req.body.availability
  };

  // Add book to the database
  books.create(book)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "!!! ERROR (Creating book object) !!!"
      });
    });
};

// Fetch all books from the database.
exports.fetchAllBooks = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [op.like]: `%${title}%` } } : null;

  books.findAll({ where: condition })
    .then(data => {
      res.send(data);
      //res.render('../views/fetchBooks.ejs', {res: res}) ;
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "!!! ERROR (Fetching books - PROJECT) !!!"
      });
    });  
};

// Fetch available books only from the database.
exports.fetchAvailableBooks = (req, res) => {
  const title = req.query.title;
  var condition1 = {availability: true} ;
  var condition2 = title ? { title: { [op.like]: `%${title}%` } } : null;

  books.findAll({ where: {condition1 : {[op.and] : condition2}}})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "!!! ERROR (Fetching books - PROJECT) !!!"
      });
    });  
};

// Fetch books from a genre in the database.
exports.fetchAllBooksFromGenre = (req, res) => {
  const genre = req.query.genre;
  var condition = genre ? { genre: { [op.like]: `%${genre}%` } } : null;

  books.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || `!!! ERROR (Fetching books from genre - ${genre}) !!!`
      });
    });
};

// Fetch a book with its unique ID
exports.fetchSingleBook = (req, res) => {
  const id = req.params.id;

  books.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Book with ID:${id} doesn't exist! `
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `!!! ERROR (Fetching book object) !!!`
      });
    });
};

// Update a book info by its ID
exports.updateBook = (req, res) => {
  const id = req.params.id;

  books.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: `Updated book with ID: ${id} successfully!`
        });
      } else {
        res.send({
          message: `Book with ID:${id} doesn't exist! `
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `!!! ERROR (Fetching book object - UPDATE) !!!`
      });
    });
};

// Delete a book with the specified ID
exports.deleteSingleBook = (req, res) => {
  const id = req.params.id;

  books.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: `Updated book with ID: ${id} successfully!`
        });
      } else {
        res.send({
          message: `Book with ID:${id} doesn't exist! `
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `!!! ERROR (Fetching book object - DELETE) !!!`
      });
    });
};

// Delete all books from the database.
exports.deleteAllBooks = (req, res) => {
  books.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} books were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || `!!! ERROR (Fetching books - DELETE ALL) !!!`
      });
    });
};



