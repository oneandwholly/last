'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const User = require('./model');
const jwt = require('jwt-simple');
const config = require('../config');

const tokenForUser = (user) => {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.get('JWT_SECRET'));
}

const router = express.Router();

// Automatically parse request body as JSON
router.use(bodyParser.json());

/**
 * POST /api/users
 *
 * Create a new user.
 */
router.post('/', (req, res, next) => {

    if (!req.body.username || !req.body.email || !req.body.password) {
        return res.status(422).send({ error: 'You must provide username, email and password'});
    }

    User.getOneByUsername(req.body.username, (err, existingUser) => {

        if (err) {
            if (err.message !== 'Not found') {
                next(err);
                return;
            }
        }
        
        // if username already exists,
        if (existingUser) {
            res.status(422).send({ error: "Username is in use"});
            return;
        }

        User.getOneByEmail(req.body.email, (err, existingUser) => {
            if (err) {
                if (err.message !== 'Not found') {
                    next(err);
                    return;
                }
            }
            
            // if email already exists,
            if (existingUser) {
                res.status(422).send({ error: "Email is in use"});
                return;
            }

            User.create(req.body, (err, entity) => {
                if (err) {
                    next(err);
                    return;
                }
                
                res.json({ token: tokenForUser(entity) });
                });
            });

        });
    });


/**
 * POST /api/users/login
 *
 * Create a new user.
 */
router.post('/login', (req, res, next) => {

    // getModel().create(req.body, (err, entity) => {
    //   if (err) {
    //     next(err);
    //     return;
    //   }
    //   res.json(entity);
    // });
  });

/**
 * GET /api/users/:id
 *
 * Retrieve a user.
 */
router.get('/:user', (req, res, next) => {
    User.read(req.params.user, (err, entity) => {
      if (err) {
        next(err);
        return;
      }
      res.json(entity);
    });
  });

/**
 * Errors on "/api/users/*" routes.
 */
router.use((err, req, res, next) => {
    // Format error and forward to generic error handler for logging and
    // responding to the request
    err.response = {
      message: err.message,
      internalCode: err.code
    };
    next(err);
  });
  
  module.exports = router;