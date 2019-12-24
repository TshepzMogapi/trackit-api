'use strict';
// Node Modules
const express = require('express');
const router = express.Router();
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');



const User = require("../Models/User");



/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management
 */

/**
 * @swagger
 * path:
 *  /users/:
 *    post:
 *      summary: Create a new user
 *      tags: [Users]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      responses:
 *        "200":
 *          description: A user schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/User'
 */
router.post('/users', (req, res, next) => {
  const { firstName, lastName } = req.body;
  const user = new User(firstName, lastName);
  res.json(user);
  
});


/**
 * @swagger
 * path:
 *  /users/:
 *    get:
 *      summary: Get all users
 *      tags: [Users]
 *      responses:
 *        "200":
 *          description: An array of users
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/User'
 */
router.get('/users', (req, res, next) => {


  const user = new User("Tshepiso", "username@domain.com");
  
  res.json({ user });
});




const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "TrackIt API",
      version: "1.0.0",
      description:
        "Rest Api Documentation for TrackIt",
    },
    servers: [
      {
        url: "http://localhost:3000/api/v1"
      }
    ]
  },
  apis: ["./Models/User.js","./Routes/index.js"]
};
const specs = swaggerJsdoc(options);
router.use("/docs", swaggerUi.serve);
router.get("/docs", swaggerUi.setup(specs, { explorer: true }));



// catch 404 and forward to error handler
router.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error Handler
router.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message
    }
  });
});

module.exports = router;
