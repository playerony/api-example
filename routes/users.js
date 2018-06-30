var express = require('express');
var router = express.Router();
var userService = require('../services/userService').userService;
var responses = require('../utils/responses').responses;

var sendResponse = function(res, err, data) {
  if(err)
    res.send(responses.failure(err));
  else
    res.send(responses.success(data));
}

router.post('/', function(req, res, next) {
  userService.insert(req, (err, data) => {
    sendResponse(res, err, data);
  });
});

router.put('/:id', function(req, res, next) {
  userService.update(req, (err, data) => {
    sendResponse(res, err, data);
  });
});

router.get('/id/:id', function(req, res, next) {
  userService.findOneById(req, (err, data) => {
    sendResponse(res, err, data);
  });
});

router.get('/username/:username', function(req, res, next) {
  userService.findOneByUsername(req, (err, data) => {
    sendResponse(res, err, data);
  });
});

router.delete('/:id', function(req, res, next) {
  userService.remove(req, (err, data) => {
    sendResponse(res, err, data);
  });
});

router.post('/login', (req, res, next) => {
  userService.login(req, (err, data) => {
    sendResponse(res, err, data);
  });
})

module.exports = router;
