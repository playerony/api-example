var db = require('../config/database');
db.connect();

var callCallback = function(callback, err, data) {
  if(err)
    callback(err, null);
  else
    callback(null, data);
}

var insert = function(username, passwordHash, callback) {
  let sql = 'INSERT INTO user(username, passwordHash) VALUES(?, ?)'

  db.get().query(sql, [username, passwordHash], function(err, rows) {
    callCallback(callback, err, rows);
  })
}

var insertRelation = function(userId, roleId, callback) {
  let sql = 'INSERT INTO user_role(user_id, role_id) VALUES(?, ?)'

  db.get().query(sql, [userId, roleId], function(err, rows) {
    callCallback(callback, err, rows);
  })
}

var update = function(id, passwordHash, callback) {
  let sql = 'UPDATE user SET passwordHash = ? WHERE id = ?'

  db.get().query(sql, [passwordHash, id], function(err, rows) {
    callCallback(callback, err, rows);
  })
}

var findOneById = function(id, callback) {
  let sql = 'SELECT id, username, passwordHash, addedOn FROM user WHERE id = ?';

  db.get().query(sql, [id], function(err, rows) {
    callCallback(callback, err, rows);
  })
}

var findOneByUsername = function(username, callback) {
  let sql = 'SELECT id, username, passwordHash, addedOn FROM user WHERE username LIKE ?';

  db.get().query(sql, [username], function(err, rows) {
    callCallback(callback, err, rows);
  })
}

var remove = function(id, callback) {
  let sql = 'DELETE FROM user WHERE id = ?';

  db.get().query(sql, [id], function(err, rows) {
    callCallback(callback, err, rows);
  })
}

var removeRelations = function(id, callback) {
  let sql = 'DELETE FROM user_role WHERE user_id = ?';

  db.get().query(sql, [id], function(err, rows) {
    callCallback(callback, err, rows);
  })
}

exports.userRepository = {
  insert,
  insertRelation,
  update,
  findOneById,
  findOneByUsername,
  remove,
  removeRelations
}