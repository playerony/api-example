var db = require('../config/database');
db.connect();

var callCallback = function(callback, err, data) {
  if(err)
    callback(err, null);
  else
    callback(null, data);
}

var insert = function(title, description, location, folderId, userId, callback) {
  let sql = 'INSERT INTO picture(title, description, location, folder_id, user_id) VALUES(?, ?, ?, ?, ?)'

  db.get().query(sql, [title, description, location, folderId, userId], function(err, rows) {
    callCallback(callback, err, rows);
  })
}

var update = function(id, title, description, location, folderId, userId, callback) {
  let sql = 'UPDATE picture SET title = ?, description = ?, location = ?, folder_id = ?, user_id = ? WHERE id = ?'

  db.get().query(sql, [title, description, location, folderId, userId, id], function(err, rows) {
    callCallback(callback, err, rows);
  })
}

var findOneById = function(id, callback) {
  let sql = 'SELECT id, title, description, location, folder_id, user_id, addedOn FROM picture WHERE id = ?';

  db.get().query(sql, [id], function(err, rows) {
    callCallback(callback, err, rows);
  })
}

var findAllByFolderId = function(folderId, callback) {
  let sql = 'SELECT id, title, description, location, folder_id, user_id, addedOn FROM picture WHERE folder_id = ?';

  db.get().query(sql, [folderId], function(err, rows) {
    callCallback(callback, err, rows);
  })
}

var remove = function(id, callback) {
  let sql = 'DELETE FROM picture WHERE id = ?';

  db.get().query(sql, [id], function(err, rows) {
    callCallback(callback, err, rows);
  })
}

exports.pictureRepository = {
  insert,
  update,
  findOneById,
  findAllByFolderId,
  remove
}