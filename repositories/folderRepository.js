var db = require('../config/database');
db.connect();

var callCallback = function(callback, err, data) {
  if(err)
    callback(err, null);
  else
    callback(null, data);
}

var insert = function(title, description, userId, callback) {
  let sql = 'INSERT INTO folder(title, description, user_id) VALUES(?, ?, ?)'

  db.get().query(sql, [title, description, userId], function(err, rows) {
    callCallback(callback, err, rows);
  })
}

var update = function(id, title, description, userId, callback) {
  let sql = 'UPDATE folder SET title = ?, description = ?, user_id = ? WHERE id = ?'

  db.get().query(sql, [title, description, userId, id], function(err, rows) {
    callCallback(callback, err, rows);
  })
}

var findOneById = function(id, callback) {
  let sql = 'SELECT id, title, description, user_id, addedOn FROM folder WHERE id = ?';

  db.get().query(sql, [id], function(err, rows) {
    callCallback(callback, err, rows);
  })
}

var findAll = function(callback) {
  let sql = 'SELECT id, title, description, user_id, addedOn FROM folder';

  db.get().query(sql, function(err, rows) {
    callCallback(callback, err, rows);
  })
}

var remove = function(id, callback) {
  let sql = 'DELETE FROM folder WHERE id = ?';

  db.get().query(sql, [id], function(err, rows) {
    callCallback(callback, err, rows);
  })
}

exports.folderRepository = {
  insert,
  update,
  findOneById,
  findAll,
  remove
}