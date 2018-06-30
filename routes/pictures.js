var express = require('express');
var router = express.Router();
var pictureService = require('../services/pictureService').pictureService
var responses = require('../utils/responses').responses

var sendResponse = function(res, err, data) {
  if(err)
    res.send(responses.failure(err));
  else
    res.send(responses.success(data));
}

router.post('/', function(req, res, next) {
  pictureService.insert(req, (err, data) => {
    sendResponse(res, err, data);
  });
});

router.put('/:id', function(req, res, next) {
  pictureService.update(req, (err, data) => {
    sendResponse(res, err, data);
  });
});

router.get('/id/:id', function(req, res, next) {
  pictureService.findOneById(req, (err, data) => {
    sendResponse(res, err, data);
  })
})

router.get('/folderId/:folderId', function(req, res, next) {
  pictureService.findAllByFolderId(req, (err, data) => {
    sendResponse(res, err, data);
  })
})

router.delete('/:id', function(req, res, next) {
  pictureService.remove(req, (err, data) => {
    sendResponse(res, err, data);
  });
});

module.exports = router;
