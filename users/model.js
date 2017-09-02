'use strict';

const mysql = require('mysql');
const config = require('../config');

const options = {
  user: config.get('MYSQL_USER'),
  password: config.get('MYSQL_PASSWORD'),
  database: config.get('MYSQL_DATABASE')
};

if (config.get('INSTANCE_CONNECTION_NAME') && config.get('NODE_ENV') === 'production') {
  options.socketPath = `/cloudsql/${config.get('INSTANCE_CONNECTION_NAME')}`;
}

const connection = mysql.createConnection(options);

// function list (limit, token, cb) {
//   token = token ? parseInt(token, 10) : 0;
//   connection.query(
//     'SELECT * FROM `books` LIMIT ? OFFSET ?', [limit, token],
//     (err, results) => {
//       if (err) {
//         cb(err);
//         return;
//       }
//       const hasMore = results.length === limit ? token + results.length : false;
//       cb(null, results, hasMore);
//     }
//   );
// }

function create (data, cb) {
  connection.query('INSERT INTO `users` SET ?', data, (err, res) => {
    if (err) {
      cb(err);
      return;
    }
    read(res.insertId, cb);
  });
}

function read (id, cb) {
  connection.query(
    'SELECT * FROM `users` WHERE `id` = ?', id, (err, results) => {
      if (!err && !results.length) {
        err = {
          code: 404,
          message: 'Not found'
        };
      }
      if (err) {
        cb(err);
        return;
      }
      cb(null, results[0]);
    });
}

function update (id, data, cb) {
  connection.query(
    'UPDATE `users` SET ? WHERE `id` = ?', [data, id], (err) => {
      if (err) {
        cb(err);
        return;
      }
      read(id, cb);
    });
}

function _delete (id, cb) {
  connection.query('DELETE FROM `users` WHERE `id` = ?', id, cb);
}

function getOneByUsername (username, cb) {
  connection.query(
    'SELECT * FROM `users` WHERE `username` = ?', username, (err, results) => {
      if (!err && !results.length) {
        err = {
          code: 404,
          message: 'Not found'
        };
      }
      if (err) {
        cb(err);
        return;
      }
      cb(null, results[0]);
    });
}

function getOneByEmail (email, cb) {
  connection.query(
    'SELECT * FROM `users` WHERE `email` = ?', email, (err, results) => {
      if (!err && !results.length) {
        err = {
          code: 404,
          message: 'Not found'
        };
      }
      if (err) {
        cb(err);
        return;
      }
      cb(null, results[0]);
    });
}

module.exports = {
  // list: list,
  create: create,
  read: read,
  update: update,
  delete: _delete,
  getOneByUsername: getOneByUsername, 
  getOneByEmail: getOneByEmail
};