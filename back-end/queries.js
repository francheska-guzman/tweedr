var promise = require('bluebird');
var options = { promiseLib: promise };
// Import pg promise library interface for PostgreSQL to handel database requests.
let pgp = require('pg-promise')(options);
// Load the postgress database location from .env
let connectionString = process.env.DATABASE_URL;
// Connect db promise to my database.
let db = pgp(connectionString);

function getAlltweed(req, res, next) {
  // Return all the records from the database using pg-promise method any.
  db.any('SELECT * FROM tweedrfeed')
    .then(function(data) {
      console.log('DATA:', data);
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'All tweeds retrieved.'
        });
    })
    .catch(function(err) {
      return next(err);
    });
}

// The axios get :id will pass here.
function getOnetweed(req, res, next) {
  // Parse the requested url to get the required tweed id using pg-promise method one, then
  let id = parseInt(req.params.id);
    db.one('select * from tweedrfeed where id = $1', id)
    .then(function(data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'One tweed retrieved.'
        });
    })
    .catch(function(err) {
      return next(err);
    });
}

function createtweed(req, res, next) {
  console.log(req);
  console.log('req.body ===>', req.body)
   db.none('insert into tweedrfeed(tweed)' +
      'values(${tweed})',
      req.body)
    .then(function() {
      res.status(200)
        .json({
          status: 'success',
          message: 'One tweed was added.'
        });
    })
    .catch(function(err) {
      console.log(err);
      return next(err);
    });
}

function updatetweed(req, res, next) {
  db.none('update tweedrfeed set tweed=$1 where id=$2', [req.body.tweed,parseInt(req.params.id)
    ])
    .then(function() {
      res.status(200)
        .json({
          status: 'success',
          message: 'One tweed was updated.'
        });
    })
    .catch(function(err) {
      console.log(err)
      return next(err);
    });
}

// This function delete the tweeds which it's id was after url.
function deletetweed(req, res, next) {
  let id = parseInt(req.params.id);
  db.result('delete from tweedrfeed where id = $1', id)
    .then(function(result) {
      res.status(200)
        .json({
          status: 'success',
          message: `Removed ${result.rowCount} tweed`
        });
    })
    .catch(function(err) {
      return next(err);
    });
}

//CRUD
module.exports = {
  createtweed: createtweed,   //CREATE
  getAlltweed: getAlltweed,   //READ
  getOnetweed: getOnetweed,   //READ
  updatetweed: updatetweed,   //UPDATE
  deletetweed: deletetweed    //DELETE
};