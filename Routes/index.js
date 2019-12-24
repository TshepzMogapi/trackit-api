'use strict';
// Node Modules
const express = require('express');
const router = express.Router();
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');


router.post('/users', (req, res, next) => {
  fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
    data = JSON.parse( data );
    data["user4"] =  {
     "name" : "User4 Name3",
     "id": 4
  };
    console.log( data );
    res.end( JSON.stringify(data));
 });
  
});

router.get('/users', (req, res, next) => {
  fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
    console.log( data );
    // res.send( data );
    res.json(data);
 });
  res.json({ userOne, userTwo });
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
  apis: ["./Routes/index.js"]
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
