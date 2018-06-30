var pictureRepository = require('../repositories/pictureRepository').pictureRepository
var folderRepository = require('../repositories/folderRepository').folderRepository
var userRepository = require('../repositories/userRepository').userRepository

var insert = function(req, callback) {
  let title = req.body.title;
  let description = req.body.description;
  let location = req.body.location;
  let userId = req.body.userId;
  let folderId = req.body.folderId;

  userRepository.findOneById(userId, (err, data) => {
    if(err)
      callback(err, null);
    else if(data.length === 0)
      callback(`User with id: '${id}' doesnt exist in database.`, null);
    else
      folderRepository.findOneById(folderId, (err, data) => {
        if(err)
          callback(err, null);
        else if(data.length === 0)
          callback(`Folder with id: '${id}' doesnt exist in database.`, null);
        else 
          pictureRepository.insert(title, description, location, folderId, userId, (err, data) => {
            if(err)
              callback(err, null);
            else 
              callback(null, data.insertedId);
          })
      })
  })
}

var update = function(req, callback) {
  let id = req.params.id;
  let title = req.body.title;
  let description = req.body.description;
  let location = req.body.location;
  let userId = req.body.userId;
  let folderId = req.body.folderId;

  pictureRepository.findOneById(id, (err, data) => {
    if(err)
      callback(err, null);
    else if(data.length === 0)
      callback(`Picture with id: '${id}' doesnt exist in database.`, null);
    else
      userRepository.findOneById(userId, (err, data) => {
        if(err)
          callback(err, null);
        else if(data.length === 0)
          callback(`User with id: '${id}' doesnt exist in database.`, null);
        else
          folderRepository.findOneById(folderId, (err, data) => {
            if(err)
              callback(err, null);
            else if(data.length === 0)
              callback(`Folder with id: '${id}' doesnt exist in database.`, null);
            else 
              pictureRepository.update(id, title, description, location, folderId, userId, (err, data) => {
                if(err)
                  callback(err, null);
                else 
                  callback(null, `Successful update a picture!`);
              })
          })
      })
  })
}

var findOneById = function(req, callback) {
  let id = req.params.id;

  pictureRepository.findOneById(id, (err, data) => {
    if(err)
      callback(err, null);
    else if(data.length === 0)
      callback(`Picture with id: '${id}' doesnt exist.`);
    else 
      callback(null, data);
  })
}

var findAllByFolderId = function(req, callback) {
  let folderId = req.params.folderId;

  pictureRepository.findAllByFolderId(folderId, (err, data) => {
    if(err)
      callback(err, null);
    else if(data.length === 0)
      callback(`There are no pictures for this folder.`);
    else 
      callback(null, data);
  })
}

var remove = function(req, callback) {
  let id = req.params.id;

  pictureRepository.findOneById(id, (err, data) => {
    if(err)
      callback(err, null);
    else if(data.length === 0)
      callback(`Picture with id: '${id}' doesnt exist in database.`, null);
    else
      pictureRepository.remove(id, (err, data) => {
        if(err)
          callback(err, null);
        else
          callback(null, `Successful deleted picture.`);
      })
  })
}

exports.pictureService = {
  insert,
  update,
  findOneById,
  findAllByFolderId,
  remove
}