const express = require('express');
const path = require('path');
const config = require('./config');

const app = express();

app.disable('etag');
app.set('trust proxy', true);
// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));


// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname+'/client/build/index.html'));
// });

// Users
app.use('/api/users', require('./users/api'));

// Basic 404 handler
app.use((req, res) => {
    res.status(404).send('Not Found');
});
  
// Basic error handler
app.use((err, req, res, next) => {
  /* jshint unused:false */
  console.error(err);
  // If our routes specified a specific response, then send that. Otherwise,
  // send a generic message so as not to leak anything.
  res.status(500).send(err.response || 'Something broke!');
});
  
if (module === require.main) {
  // Start the server
  const server = app.listen(config.get('PORT'), () => {
  const port = server.address().port;
    console.log(`App listening on port ${port}`);
  });
}
  
module.exports = app;