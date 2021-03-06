'use strict';

// Hierarchical node.js configuration with command-line arguments, environment
// variables, and files.
const nconf = module.exports = require('nconf');
const path = require('path');

nconf
  // 1. Command-line arguments
  .argv()
  // 2. Environment variables
  .env([
    'CLOUD_BUCKET',
    'DATA_BACKEND',
    'GCLOUD_PROJECT',
    'INSTANCE_CONNECTION_NAME',
    'MYSQL_USER',
    'MYSQL_PASSWORD',
    'MYSQL_DATABASE',
    'NODE_ENV',
    'PORT',
    'JWT_SECRET'
  ])
  // 3. Config file
  .file({ file: path.join(__dirname, 'config.json') })
  // 4. Defaults
  .defaults({
    // Typically you will create a bucket with the same name as your project ID.
    CLOUD_BUCKET: '',

    DATA_BACKEND: 'cloudsql',

    // This is the id of your project in the Google Cloud Developers Console.
    GCLOUD_PROJECT: '',

    MYSQL_USER: '',
    MYSQL_PASSWORD: '',

    PORT: 5000
  });

// Check for required settings
checkConfig('GCLOUD_PROJECT');
checkConfig('CLOUD_BUCKET');

checkConfig('MYSQL_USER');
checkConfig('MYSQL_PASSWORD');

if (nconf.get('NODE_ENV') === 'production') {
  checkConfig('INSTANCE_CONNECTION_NAME');
}

function checkConfig (setting) {
  if (!nconf.get(setting)) {
    throw new Error(`You must set ${setting} as an environment variable or in config.json!`);
  }
}
