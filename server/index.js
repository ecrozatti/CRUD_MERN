const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express(); 
require('dotenv').config();

const FoodModel = require('./models/Food');

app.use(express.json());
app.use(cors());

mongoose.connect(`${process.env.MONGODB_STRING}`, {
   useNewUrlParser: true,
   useUnifiedTopology: true,
});

app.post('/insert', async (req, res) => {
   const { foodName, days } = req.body;

   const food = new FoodModel({foodName: foodName, daysSinceIAte: days});

   try {
      await food.save();
      res.send('Insert food...');
   } catch(err) {
      console.log(err);
   }
});

app.get('/read', async (req, res) => {
   // FoodModel.find({ foodName: 'Apple' }, (err, result) => {
   FoodModel.find({}, (err, result) => {
      if (err) {
         res.send(err);
      }
      res.send(result);
   })
});

app.put('/update', async (req, res) => {
   const { id, newFoodName } = req.body;

   try {
      await FoodModel.findById(id, (err, updatedFood) => {
         if (err) {
            res.send(err);
         }
         updatedFood.foodName = newFoodName;
         updatedFood.save();
         res.send('Update food...')
      });
   } catch(err) {
      console.log(err);
   }
});

app.delete('/delete/:id', async (req, res) => {
   const { id } = req.params;

   await FoodModel.findByIdAndDelete(id);
   res.send('Delete food...');
});

app.listen(3333, () => {
   console.log('🚀 Server started on port 3333!');
})