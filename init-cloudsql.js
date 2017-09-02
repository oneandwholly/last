
const extend = require('lodash').assign;
const mysql = require('mysql');

if (module === require.main) {
  const prompt = require('prompt');
  prompt.start();

  console.log(
    `Running this script directly will allow you to initialize your mysql database.
    This script will not modify any existing tables.`);

  prompt.get(['user', 'password'], (err, result) => {
    if (err) {
      return;
    }
    createSchema(result);
  });
}

function createSchema (config) {
  const connection = mysql.createConnection(extend({
    multipleStatements: true
  }, config));

  connection.query(
    `CREATE DATABASE IF NOT EXISTS \`instaclone\`
      DEFAULT CHARACTER SET = 'utf8'
      DEFAULT COLLATE 'utf8_general_ci';
    USE \`instaclone\`;
    CREATE TABLE IF NOT EXISTS \`instaclone\`.\`users\` (
      \`id\` INT UNSIGNED NOT NULL AUTO_INCREMENT,
      \`username\` VARCHAR(255) NOT NULL,
      \`email\` VARCHAR(255) NOT NULL,
      \`password\` VARCHAR(255) NOT NULL,
      \`isPrivate\` TINYINT(1) DEFAULT 0 NOT NULL,
      \`createdAt\` TIMESTAMP DEFAULT NOW() NOT NULL,
    PRIMARY KEY (\`id\`));`,
    (err) => {
      if (err) {
        throw err;
      }
      console.log('Successfully created schema');
      connection.end();
    }
  );
}