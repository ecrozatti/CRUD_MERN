const mongoose = require('mongoose');

const FoodSchema = new mongoose.Schema({
   foodName: {
      type: String,
      required: true
   },
   daysSinceIAte: {
      type: Number,
      required: true
   }
});

const FoodDB = mongoose.model('food', FoodSchema);

module.exports = FoodDB;