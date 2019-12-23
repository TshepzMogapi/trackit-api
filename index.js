
const express = require('express');
const router = express.Router();
var fs = require("fs");
// const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Trackit Api');
});
  
app.get('/users', function (req, res) {
    fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
       console.log( data );
       res.end( data );
    });
 })


app.post('/users', function (req, res) {
    // First read existing users.
    fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
       data = JSON.parse( data );
       data["user4"] =  {
        "name" : "User4 Name3",
        "id": 4
     };
       console.log( data );
       res.end( JSON.stringify(data));
    });
 })

app.listen(port, () => console.log(`Track It API listening on port ${port}!`))