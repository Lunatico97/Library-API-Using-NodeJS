//Controller for making functions as per the models exported later for routing
//Author: Diwas Adhikari

const database = require("../models/sequelizeInit.js");
const pubs = database.pubs;
const op = database.seq.Op;
const publish = database.publish;

// Create a pub entry
exports.createPub = (req, res) => {
  // I don't want blank data !
  if (!req.body.title) {
    res.status(400).send({
      message: "Don't leave empty data!"
    });
    return;
  }

  // Create a pub object
  const pub = {
    name: req.body.name,
    address: req.body.address,
    PAN: req.body.PAN
  };

  // Add Pubs to the database
  pubs.create(pub)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "!!! ERROR (Creating pub object) !!!"
      });
    });
};

// Fetch all pubs from the database.
exports.fetchAllPubs = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [op.like]: `%${name}%` } } : null;

  pubs.findAll({ where: condition })
    .then(data => {
      res.send(data);
      //res.render('../views/fetchPubss.ejs', {res: res}) ;
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "!!! ERROR (Fetching pubs - PROJECT) !!!"
      });
    });  
};

// Fetch a pub with its unique ID
exports.fetchSinglePub = (req, res) => {
  const id = req.params.id;

  pubs.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Pub with ID:${id} doesn't exist! `
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `!!! ERROR (Fetching pubs object) !!!`
      });
    });
};

// Update a pub info by its ID
exports.updatePub = (req, res) => {
  const id = req.params.id;

  pubs.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: `Updated Pub with ID: ${id} successfully!`
        });
      } else {
        res.send({
          message: `Pub with ID:${id} doesn't exist! `
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `!!! ERROR (Fetching pubs object - UPDATE) !!!`
      });
    });
};

// Delete a pub with the specified ID
exports.deleteSinglePub = (req, res) => {
  const id = req.params.id;

  pubs.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: `Updated Pubs with ID: ${id} successfully!`
        });
      } else {
        res.send({
          message: `Pubs with ID:${id} doesn't exist! `
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `!!! ERROR (Fetching pubs object - DELETE) !!!`
      });
    });
};

// Delete all pubs from the database.
exports.deleteAllPubs = (req, res) => {
  pubs.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} pubs were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || `!!! ERROR (Fetching pubs - DELETE ALL) !!!`
      });
    });
};

// Create book published entries
exports.createPublish = (req, res) => {
    const id = req.params.id ;
    // I don't want blank data !
    if (!req.body.bookId) {
      res.status(400).send({
        message: "Don't leave empty data!"
      });
      return;
    }
  
    // Create an issue object
    const published = {
      bookId: req.body.bookId,
      pubId: id
    };
  
    // Add issue to the database
    publish.create(published)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "!!! ERROR (Creating published records) !!!"
        });
      });
  };
  
  // Fetch all published records from  a publication.
  exports.fetchPublish = (req, res) => {
    const id = req.params.id ;
    publish.findAll({ where: {pubId : id} })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "!!! ERROR (Fetching published records - PROJECT) !!!"
        });
      });
  };
  
  // Delete a book published record with the specified ID for a publication
  exports.deletePublish = (req, res) => {
    const id = req.params.id;
    const publ = req.params.publ;
  
    publish.destroy({
      where: { pubId: id, bookId: publ }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: `Deleted record of ID: ${publ} for publication ID: ${id} successfully!`
          });
        } else {
          res.send({
            message: `Record with ID:${publ} doesn't exist! `
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: `!!! ERROR (Fetching published records - DELETE) !!!`
        });
      });
  };
