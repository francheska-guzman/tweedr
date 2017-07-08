var promise = require('bluebird');
var options = { promiseLib: promise };
// import pg promise library interface for PostgreSQL to handel database requests
let pgp = require('pg-promise')(options);
// load the postgress database location from  .env
let connectionString = process.env.DATABASE_URL;
// connect  db promise to my database
let db = pgp(connectionString);

// The axios get comes here
function getAlltweed(req, res, next) {
  // return all the records from the database using pg-promise method any , then
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
// The axios get : id comes here
function getOnetweed(req, res, next) {
  // parse the requested url to get the required tweed id using pg-promise method one , then
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
// this function add one tweed to the database using postman
/*
post
    {
    "tweed": "I  can tweed",
  }

*/
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

// change the information inside the database
/*
 put
  {
    "id" : 12,
    "tweed": "I  can develop APIs",
  }
*/
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
// this function delete the tweeds which it's id was after url
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