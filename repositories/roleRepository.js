var db = require('../config/database');
db.connect();

var callCallback = function(callback, err, data) {
  if(err)
    callback(err, null);
  else
    callback(null, data);
}

var insert = function(name, callback) {
  let sql = 'INSERT INTO role(name) VALUES(?)'

  db.get().query(sql, [name], function(err, rows) {
    callCallback(callback, err, rows);
  })
}

var update = function(id, name, callback) {
  let sql = 'UPDATE role SET name = ? WHERE id = ?'

  db.get().query(sql, [name, id], function(err, rows) {
    callCallback(callback, err, rows);
  })
}

var findOneById = function(id, callback) {
  let sql = 'SELECT id, name, addedOn FROM role WHERE id = ?';

  db.get().query(sql, [id], function(err, rows) {
    callCallback(callback, err, rows);
  })
}

var findOneByName = function(name, callback) {
  let sql = 'SELECT id, name, addedOn FROM role WHERE name = ?';

  db.get().query(sql, [name], function(err, rows) {
    callCallback(callback, err, rows);
  })
}

var findRolesByUserId = function(userId, callback) {
  let sql = 'SELECT r.id, r.name, r.addedOn FROM role r JOIN user_role ON role_id = r.id WHERE user_id = ?';

  db.get().query(sql, [userId], function(err, rows) {
    callCallback(callback, err, rows);
  })
}

var findAll = function(callback) {
  let sql = 'SELECT id, name, addedOn FROM role';

  db.get().query(sql, function(err, rows) {
    callCallback(callback, err, rows);
  })
}

var remove = function(id, callback) {
  let sql = 'DELETE FROM role WHERE id = ?';

  db.get().query(sql, [id], function(err, rows) {
    callCallback(callback, err, rows);
  })
}

exports.roleRepository = {
  insert,
  update,
  findOneById,
  findOneByName,
  findRolesByUserId,
  findAll,
  remove
}