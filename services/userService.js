var userRepository = require('../repositories/userRepository').userRepository
var roleRepository = require('../repositories/roleRepository').roleRepository
var bcrypt = require('bcrypt')

var insert = function(req, callback) {
  let username = req.body.username;
  let password = req.body.password;

  userRepository.findOneByUsername(username, (err, data) => {
    if(err)
      callback(err, null);
    else if(data.length === 0)
      callback(`User '${username}' already exist in database.`, null);
    else 
      roleRepository.findOneByName('USER', (err, data) => {
        if(err)
          callback('There was unexpected problem during fetching a role.', null);
        else
          bcrypt.hash(password, 10, (err, result) => {
            let role = data[0];

            userRepository.insert(username, result, (err, data) => {
              if(err)
                callback(err, null);
              else 
                userRepository.insertRelation(data.insertId, role.id, (err, data) => {
                  if(err)
                    callback(err, null);
                  else 
                    callback(null, data);
                })
            })
          })
      })
  })
}

var update = function(req, callback) {
  let password = req.body.password;
  let id = req.params.id;

  userRepository.findOneById(id, (err, data) => {
    if(err)
      callback(err, null);
    else if(!data)
      callback(`User with this id: ${id} doesnt exist in database.`, null);
    else
      bcrypt.compare(data.passwordHash, password, (err, result) => {
        if(err)
          callback(err, null);
        if(result)
          callback('User is unauthorized.', null);
        else
          bcrypt.hash(password, 10, (err, result) => {
            userRepository.update(id, result, (err, data) => {
              if(err)
                callback(err, null);
              else 
                callback(null, `Successful update user.`);
            })
          })
      })
  })
}

var findOneById = function(req, callback) {
  let id = req.params.id;

  userRepository.findOneById(id, (err, data) => {
    let user = data;

    if(err)
      callback(err, null);
    if(data.length === 0)
      callback(`User with id: '${id}' doesnt exist.`);
    else 
      roleRepository.findRolesByUserId(id, (err, data) => {
        if(err)
          callback(err, null);
        if(data.length === 0)
          callback(`User dont have any role.`, null);
        else {
          let d = user[0];
          d.roles = data;

          callback(null, d);
        }
      })
  })
}

var findOneByUsername = function(req, callback) {
  let username = req.params.username;

  userRepository.findOneByUsername(username, (err, data) => {
    if(err)
      callback(err, null);
    else if(data.length === 0)
      callback(`User with username: '${username}' doesnt exist.`, null);
    else 
      callback(null, data);
  })
}

var remove = function(req, callback) {
  let id = req.params.id;

  userRepository.findOneById(id, (err, data) => {
    if(err)
      callback(err, null);
    else if(data.length === 0)
      callback(`User with id: '${id}' doesnt exist in database.`, null);
    else
      userRepository.remove(id, (err, data) => {
        if(err)
          callback(err, null);
        else
          userRepository.removeRelations(id, (err, data) => {
            if(err)
              callback(err, null);
            else
              callback(null, `Successful deleted user.`);
          })
      })
  })
}

exports.userService = {
  insert,
  update,
  findOneById,
  findOneByUsername,
  remove
}