const express = require('express');
const mustacheExpress = require('mustache-express');
const router = express.Router();
const bodyParser = require("body-parser");
const app = express();

app.engine('mustache', mustacheExpress());
app.set('views', './views')
app.set('view engine', 'mustache')

app.use(bodyParser.urlencoded({extended: false}));

const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const Album = require('./albums.js');
mongoose.connect('mongodb://localhost:27017/albums-db');

let album = new Album({});

Album.create({artist :"Arca", name :"Mutant", year :2015, genres : {genre1 :"dance", genre2 :"electronic"}})
.then(function(){
  console.log("album was created!");
}).catch(function(){
  console.log("error creating album");
});

app.get('/', function(req, res) {
  Album.find().then(function(album){
    res.render('index', {album: album})
  })
});

app.post('/', function(req, res){

  let album = new Album({
    artist: req.body.artist,
    name: req.body.name,
    year: req.body.year,
    genres: [
      {
        genre1: req.body.genre1,
        genre2: req.body.genre2,
        genre3: req.body.genre3
      }
    ]
  })

  album.save().then(function() {
    console.log("an album has been added to the database");
    Album.find().then(function(album){
      res.render('index', {album: album})
    })
  }).catch(function() {
    console.log("error adding album to the database");
  })
});



app.listen(3000, function () {
  console.log('Successfully started express application!');
});
