//Controller for making functions as per the models exported later for routing
//Author: Diwas Adhikari

const validationRules = require('../authentication/rules.js');
const asyncValidator = require('async-validator-2');
const database = require("../models/sequelizeInit.js");
const users = database.users;
const issues = database.issues ;
const op = database.seq.Op;
const seqObj = database.seqObj ;

// Create user entries
exports.createUser = (req, res) => {
  // I don't want blank data !
  if (!req.body.name) {
    res.status(400).send({
      message: "Don't leave empty data!"
    });
    return;
  }

  // Create an user object
  const user = {
    name: req.body.name,
    password: req.body.password,
  };

  // Add user to the database
  users.create(user)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "!!! ERROR (Creating user object) !!!"
      });
    });
};

// Fetch all users from the database.
exports.fetchAllUsers = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [op.like]: `%${name}%` } } : null;

  users.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "!!! ERROR (Fetching users - PROJECT) !!!"
      });
    });
};

// Fetch user with its unique ID
exports.fetchSingleUser = (req, res) => {
  const id = req.params.id;

  users.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `User with ID:${id} doesn't exist! `
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `!!! ERROR (Fetching user object) !!!`
      });
    });
};

// Update a user info by its ID
exports.updateUser = (req, res) => {
  const id = req.params.id;

  users.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: `Updated user with ID: ${id} successfully!`
        });
      } else {
        res.send({
          message: `User with ID:${id} doesn't exist! `
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `!!! ERROR (Fetching user object - UPDATE) !!!`
      });
    });
};

// Delete a users with the specified ID
exports.deleteSingleUser = (req, res) => {
  const id = req.params.id;

  users.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: `Deleted user with ID: ${id} successfully!`
        });
      } else {
        res.send({
          message: `User with ID:${id} doesn't exist! `
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `!!! ERROR (Fetching user object - DELETE) !!!`
      });
    });
};

// Delete all users from the database.
exports.deleteAllUsers = (req, res) => {
  users.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} users were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || `!!! ERROR (Fetching users - DELETE ALL) !!!`
      });
    });
};

// Create book issue entries
exports.createIssue = (req, res) => {
  const id = req.params.id ;
  // I don't want blank data !
  if (!req.body.bookId) {
    res.status(400).send({
      message: "Don't leave empty data!"
    });
    return;
  }

  // Create an issue object
  const issue = {
    bookId: req.body.bookId,
    userId: id
  };

  // Add issue to the database
  issues.create(issue)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "!!! ERROR (Creating user issues) !!!"
      });
    });
};

// Fetch all issues from  a user.
exports.fetchIssues = (req, res) => {
  const id = req.params.id ;
  issues.findAll({ where: {userId : id} })
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

// Delete a book issue with the specified ID for an user
exports.deleteIssue = (req, res) => {
  const id = req.params.id;
  const issue = req.params.issue ;

  issues.destroy({
    where: { userId: id, bookId: issue }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: `Deleted issue of ID: ${issue} for user ID: ${id} successfully!`
        });
      } else {
        res.send({
          message: `Issue with ID:${issue} doesn't exist! `
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `!!! ERROR (Fetching user issue - DELETE) !!!`
      });
    });
};

//Simple User Authetication

exports.authenticate = (req, res) => {
    const name = req.query.name ;
    const password = req.query.password ;
    const gimmeUser = users.findOne({where: { name: name, password: password }})
    .then(function(gimmeUser) {
      // res.json(dbUser);
      if (gimmerUser != null) {
        res.redirect("/users");
      }
    })
    .catch(err => {
        console.log(err) ;
    }) ;
    
} ;
    