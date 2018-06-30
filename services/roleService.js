var roleRepository = require('../repositories/roleRepository').roleRepository

var insert = function(req, callback) {
  let name = req.body.name;

  roleRepository.findOneByName(name, (err, data) => {
    if(data)
      callback(`Role '${name}' already exist in database.`, null);
    else
      roleRepository.insert(name, (err, data) => {
        if(err)
          callback(err, null);
        else 
          callback(null, data);
      })
  })
}

var update = function(req, callback) {
  let id = req.params.id;
  let name = req.body.name;

  roleRepository.findOneById(id, (err, data) => {
    if(!data)
      callback(`Role with id: '${id}' doesnt exist in database.`, null);
    else
      roleRepository.update(id, name, (err, data) => {
        if(err)
          callback(err, null);
        else
          callback(null, `Successful update role with id: '${id}' and its new name is: '${name}'`);
      })
  })
}

var findOneById = function(req, callback) {
  let id = req.params.id;

  roleRepository.findOneById(id, (err, data) => {
    if(err)
      callback(err, null);
    else if(data.length === 0)
      callback(`Role with id: '${id}' doesnt exist.`)
    else 
      callback(null, data);
  })
}

var findOneByName = function(req, callback) {
  let name = req.params.name;

  roleRepository.findOneByName(name, (err, data) => {
    if(err)
      callback(err, null);
    else if(data.length === 0)
      callback(`Role with name: '${name}' doesnt exist.`, null)
    else
      callback(null, data);
  })
}

var findRolesByUserId = function(req, callback) {
  let userId = req.params.userId;

  roleRepository.findRolesByUserId(userId, (err, data) => {
    if(err)
      callback(err, null);
    else 
      callback(null, data);
  })
}

var findAll = function(callback) {
  roleRepository.findAll((err, data) => {
    if(err)
      callback(err, null);
    else 
      callback(null, data);
  })
}

var remove = function(req, callback) {
  let id = req.params.id;

  roleRepository.findOneById(id, (err, data) => {
    if(err)
      callback(err, null);
    else if(data.length === 0)
      callback(`Role with id: '${id}' doesnt exist in database.`, null);
    else
      roleRepository.remove(id, (err, data) => {
        if(err)
          callback(err, null);
        else
          callback(null, `Successful deleted user.`);
      })
  })
}

exports.roleService = {
  insert,
  update,
  findOneById,
  findOneByName,
  findRolesByUserId,
  findAll,
  remove
}