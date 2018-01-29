// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var product_details = new Schema({

  name: String,
  img  : String,
  tagline: String,
  price: Number,
  stock: Number,
    fiber: String,
    vitamin: String,
    potassium: String,
    energy: Number
}, 
{

   timestamps: true

});

// the schema is useless so far
// we need to create a model using it
module.exports = mongoose.model('product', product_details);
