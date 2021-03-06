var express = require('express');
var router = express.Router();

var db = require('../queries');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Tweedr Api' });
});

// adding the routes for the axios calls
// get: read from API every thing
router.get('/tweedrfeed', db.getAlltweed);
// get:ss read from API certain record with certain id number
router.get('/tweedrfeed/:id', db.getOnetweed);
// post adding new record
router.post('/tweedrfeed', db.createtweed);
// put editing the existed record
router.put('/tweedrfeed/:id', db.updatetweed);
// deleting the record
router.delete('/tweedrfeed/:id', db.deletetweed);

module.exports = router;