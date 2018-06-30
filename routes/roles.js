var express = require('express');
var router = express.Router();
var roleService = require('../services/roleService').roleService
var responses = require('../utils/responses').responses

var sendResponse = function(res, err, data) {
  if(err)
    res.send(responses.failure(err));
  else
    res.send(responses.success(data));
}

router.post('/', function(req, res, next) {
  roleService.insert(req, (err, data) => {
    sendResponse(res, err, data);
  });
});

router.put('/:id', function(req, res, next) {
  roleService.update(req, (err, data) => {
    sendResponse(res, err, data);
  });
});

router.get('/id/:id', function(req, res, next) {
  roleService.findOneById(req, (err, data) => {
    sendResponse(res, err, data);
  })
})

router.get('/name/:name', function(req, res, next) {
  roleService.findOneByName(req, (err, data) => {
    sendResponse(res, err, data);
  })
})

router.get('/userId/:userId', function(req, res, next) {
  roleService.findRolesByUserId(req, (err, data) => {
    sendResponse(res, err, data);
  })
})

router.get('/', function(req, res, next) {
  roleService.findAll((err, data) => {
    sendResponse(res, err, data);
  })
})

router.delete('/:id', function(req, res, next) {
  roleService.remove(req, (err, data) => {
    sendResponse(res, err, data);
  });
});

module.exports = router;
