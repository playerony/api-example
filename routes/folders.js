var express = require('express');
var router = express.Router();
var folderService = require('../services/folderService').folderService
var responses = require('../utils/responses').responses

var sendResponse = function(res, err, data) {
  if(err)
    res.send(responses.failure(err));
  else
    res.send(responses.success(data));
}

router.post('/', function(req, res, next) {
  folderService.insert(req, (err, data) => {
    sendResponse(res, err, data);
  });
});

router.put('/:id', function(req, res, next) {
  folderService.update(req, (err, data) => {
    sendResponse(res, err, data);
  });
});

router.get('/:id', function(req, res, next) { 
  folderService.findOneById(req, (err, data) => {
    sendResponse(res, err, data);
  })
})

router.get('/', function(req, res, next) {
  folderService.findAll((err, data) => {
    sendResponse(res, err, data);
  })
})

router.delete('/:id', function(req, res, next) {
  folderService.remove(req, (err, data) => {
    sendResponse(res, err, data);
  });
});

module.exports = router;
