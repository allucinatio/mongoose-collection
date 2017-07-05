const mongoose = require('mongoose');

const albumSchema = new mongoose.Schema({
  artist: {type:String, required:true},
  name: {type:String, required:true},
  year: {type:Number},
  genres: [
    {
      genre1: {type:String},
      genre2: {type:String},
      genre3: {type:String}
    }
  ]
});

const Album = mongoose.model('Album', albumSchema);

module.exports = Album;
