var userRepository = require('../repositories/userRepository').userRepository
var folderRepository = require('../repositories/folderRepository').folderRepository

var insert = function(req, callback) {
  let title = req.body.title;
  let description = req.body.description;
  let userId = req.body.userId;

  userRepository.findOneById(userId, (err, data) => {
    if(err)
      callback(err, null);
    else if(data.length === 0)
      callback(`User with id: '${userId}' doesnt exist in database.`, null);
    else
      folderRepository.insert(title, description, userId, (err, data) => {
        if(err)
          callback(err, null);
        else 
          callback(null, data);
        })
      })
}

var update = function(req, callback) {
  let id = req.params.id;
  let title = req.body.title;
  let description = req.body.description;
  let userId = req.body.userId;

  folderRepository.findOneById(id, (err, data) => {
    if(err)
      callback(err, null);
    else if(data.length === 0)
      callback(`Folder with id: '${id}' doesnt exist in database.`, null);
    else
      userRepository.findOneById(userId, (err, data) => {
        if(err)
          callback(err, null);
        else if(data.length === 0)
          callback(`User with id: '${id}' doesnt exist in database.`, null);
        else
          folderRepository.update(id, title, description, userId, (err, data) => {
            if(err)
              callback(err, null);
            else 
              callback(null, `Successful update a folder!`);
          })
      })
  })
}

var findOneById = function(req, callback) {
  let id = req.params.id;

  folderRepository.findOneById(id, (err, data) => {
    if(err)
      callback(err, null);
    else if(data.length === 0)
      callback(`Folder with id: '${id}' doesnt exist.`);
    else 
      callback(null, data);
  })
}

var findAll = function(callback) {
  folderRepository.findAll((err, data) => {
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

  folderRepository.findOneById(id, (err, data) => {
    if(err)
      callback(err, null);
    else if(data.length === 0)
      callback(`Folder with id: '${id}' doesnt exist in database.`, null);
    else
      folderRepository.remove(id, (err, data) => {
        if(err)
          callback(err, null);
        else
          callback(null, `Successful deleted folder.`);
      })
  })
}

exports.folderService = {
  insert,
  update,
  findOneById,
  findAll,
  remove
}