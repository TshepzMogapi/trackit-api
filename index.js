
const express = require('express');
const router = express.Router();

var fs = require("fs");

const bodyParser = require('body-parser');
const routes = require("./Routes");

const app = express();




const port = 3000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



app.use("/api/v1", routes);

app.listen(port, () => console.log(`Track It API listening on port ${port}!`))